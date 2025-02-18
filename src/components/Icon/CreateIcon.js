

// @ts-nocheck
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  NativeModules,
  Platform,
  PixelRatio,
  processColor,
  Text,
} from 'react-native';

const TYPE_VALUE = 'value';
const TYPE_ERROR = 'error';

export const NativeIconAPI =
  NativeModules.RNVectorIconsManager || NativeModules.RNVectorIconsModule;

export const DEFAULT_ICON_SIZE = 12;
export const DEFAULT_ICON_COLOR = 'black';

export function ensureNativeModuleAvailable() {
  if (!NativeIconAPI) {
    if (Platform.OS === 'android') {
      throw new Error(
        'RNVectorIconsModule not available, did you properly integrate the module? Try running `react-native link react-native-vector-icons` and recompiling.',
      );
    }
    throw new Error(
      'RNVectorIconsManager not available, did you add the library to your project and link with libRNVectorIcons.a? Try running `react-native link react-native-vector-icons` and recompiling.',
    );
  }
}
export function createIconSourceCache() {
  const cache = new Map();

  const setValue = (key, value) =>
    cache.set(key, { type: TYPE_VALUE, data: value });

  const setError = (key, error) =>
    cache.set(key, { type: TYPE_ERROR, data: error });

  const has = (key) => cache.has(key);

  const get = (key) => {
    if (!cache.has(key)) {
      return undefined;
    }
    const { type, data } = cache.get(key);
    if (type === TYPE_ERROR) {
      throw data;
    }
    return data;
  };

  return { setValue, setError, has, get };
}

export function createIconSetFromIcoMoon(config, fontFamilyArg, fontFile) {
  const glyphMap = {};
  config.icons.forEach((icon) => {
    icon.properties.name.split(/\s*,\s*/g).forEach((name) => {
      glyphMap[name] = icon.properties.code;
    });
  });

  const fontFamily =
    fontFamilyArg || config.preferences.fontPref.metadata.fontFamily;

  return createIconSet(glyphMap, fontFamily, fontFile || `${fontFamily}.ttf`);
}

export function createIconSet(glyphMap, fontFamily, fontFile, fontStyle) {
  // Android doesn't care about actual fontFamily name, it will only look in fonts folder.
  const fontBasename = fontFile
    ? fontFile.replace(/\.(otf|ttf)$/, '')
    : fontFamily;

  const fontReference = Platform.select({
    windows: `/Assets/${fontFile}#${fontFamily}`,
    android: fontBasename,
    web: fontBasename,
    default: fontFamily,
  });

  const IconNamePropType = PropTypes.oneOf(Object.keys(glyphMap));
  class Icon extends PureComponent {
    root = null;

    static propTypes = {
      allowFontScaling: PropTypes.bool,
      name: PropTypes.string,
      size: PropTypes.number,
      color: PropTypes.any,
      children: PropTypes.node,
      style: PropTypes.any,
    };

    static defaultProps = {
      size: DEFAULT_ICON_SIZE,
      allowFontScaling: false,
    };

    setNativeProps(nativeProps) {
      if (this.root) {
        this.root.setNativeProps(nativeProps);
      }
    }

    handleRef = (ref) => {
      this.root = ref;
    };

    render() {
      const { name, size, color, style, children, ...props } = this.props;
      //console.log('cc', JSON.stringify(glyphMap));
      let glyph = name ? glyphMap[name] || '?' : '';
      if (typeof glyph === 'number') {
        glyph = String.fromCodePoint(glyph);
      }

      const styleDefaults = {
        fontSize: size,
        color,
      };

      const styleOverrides = {
        fontFamily: fontReference,
        fontWeight: 'normal',
        fontStyle: 'normal',
      };

      props.style = [styleDefaults, style, styleOverrides, fontStyle || {}];
      props.ref = this.handleRef;

      return (
        <Text {...props}>
          {glyph}
          {children}
        </Text>
      );
    }
  }

  const imageSourceCache = createIconSourceCache();

  function resolveGlyph(name) {
    const glyph = glyphMap[name] || '?';
    if (typeof glyph === 'number') {
      return String.fromCodePoint(glyph);
    }
    return glyph;
  }

  function getImageSourceSync(
    name,
    size = DEFAULT_ICON_SIZE,
    color = DEFAULT_ICON_COLOR,
  ) {
    ensureNativeModuleAvailable();
    const glyph = resolveGlyph(name);
    const processedColor = processColor(color);
    const cacheKey = `${glyph}:${size}:${processedColor}`;

    if (imageSourceCache.has(cacheKey)) {
      return imageSourceCache.get(cacheKey);
    }
    try {
      const imagePath = NativeIconAPI.getImageForFontSync(
        fontReference,
        glyph,
        size,
        processedColor,
      );
      const value = { uri: imagePath, scale: PixelRatio.get() };
      imageSourceCache.setValue(cacheKey, value);
      return value;
    } catch (error) {
      imageSourceCache.setError(cacheKey, error);
      throw error;
    }
  }

  async function getImageSource(
    name,
    size = DEFAULT_ICON_SIZE,
    color = DEFAULT_ICON_COLOR,
  ) {
    ensureNativeModuleAvailable();
    const glyph = resolveGlyph(name);
    const processedColor = processColor(color);
    const cacheKey = `${glyph}:${size}:${processedColor}`;

    if (imageSourceCache.has(cacheKey)) {
      return imageSourceCache.get(cacheKey);
    }
    try {
      const imagePath = await NativeIconAPI.getImageForFont(
        fontReference,
        glyph,
        size,
        processedColor,
      );
      const value = { uri: imagePath, scale: PixelRatio.get() };
      imageSourceCache.setValue(cacheKey, value);
      return value;
    } catch (error) {
      imageSourceCache.setError(cacheKey, error);
      throw error;
    }
  }

  async function loadFont(file = fontFile) {
    if (Platform.OS === 'ios') {
      ensureNativeModuleAvailable();
      if (!file) {
        throw new Error('Unable to load font, because no file was specified. ');
      }
      await NativeIconAPI.loadFontWithFileName(...file.split('.'));
    }
  }

  function hasIcon(name) {
    return Object.prototype.hasOwnProperty.call(glyphMap, name);
  }

  function getRawGlyphMap() {
    return glyphMap;
  }

  function getFontFamily() {
    return fontReference;
  }

  Icon.getImageSource = getImageSource;
  Icon.getImageSourceSync = getImageSourceSync;
  Icon.loadFont = loadFont;
  Icon.hasIcon = hasIcon;
  Icon.getRawGlyphMap = getRawGlyphMap;
  Icon.getFontFamily = getFontFamily;

  return Icon;
}
