export interface ApiResponse<T> {
  status: ResponseStatus;
  data: T;
}

export interface CryptoCurrencyByKey {
  [key: string]: CryptoCurrencyDto;
}

export interface CurrencyBasicDto {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  quoteShow: string;
}

export interface CryptoCurrencyDto extends CurrencyBasicDto {
  num_market_pairs: number;
  date_added: Date;
  tags: string[];
  max_supply: number | null;
  circulating_supply: number;
  total_supply: number;
  infinite_supply: boolean;
  platform: PlatformDto | null;
  cmc_rank: number;
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;
  tvl_ratio: number | null;
  last_updated: Date;
  quote: QuoteDto;
}

export interface PlatformDto {
  id: number;
  name: Name;
  symbol: CryptoSymbol;
  slug: CryptoSymbolSlug;
  token_address: string;
}

export enum Name {
  BNBSmartChainBEP20 = "BNB Smart Chain (BEP20)",
  Ethereum = "Ethereum",
  Hyperliquid = "Hyperliquid",
  Kaia = "KAIA",
  Optimism = "Optimism",
  Osmosis = "Osmosis",
  Solana = "Solana",
}

export enum CryptoSymbolSlug {
  Bnb = "bnb",
  Ethereum = "ethereum",
  Hyperliquid = "hyperliquid",
  Kaia = "kaia",
  OptimismEthereum = "optimism-ethereum",
  Osmosis = "osmosis",
  Solana = "solana",
}

export enum CryptoSymbol {
  Bnb = "BNB",
  Eth = "ETH",
  Hype = "HYPE",
  Kaia = "KAIA",
  Op = "OP",
  Osmo = "OSMO",
  Sol = "SOL",
}

export interface QuoteDto {
  USD: ConvertionDto;
}

export interface ConvertionDto {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: number | null;
  last_updated: Date;
}

export interface ResponseStatus {
  timestamp: Date;
  error_code: number;
  error_message: null;
  elapsed: number;
  credit_count: number;
  notice: null;
  total_count: number;
}
