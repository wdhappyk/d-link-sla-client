export interface AuthorizeData {
  token: string;
  permission: string;
  user: string;
}

export interface Firmware {
  model: string;
  version?: string;
}

export interface SysLogHeader {
  host: string;
  facility?: number;
  severity?: number;
  time?: string;
}

export interface WANObject {
  crc: number;
  drop: number;
  '64bytes': number;
  fragments: number;
  snd: number;
  snd_bytes: number;
  rcv_bytes: number;
  snd_bytes_diff: number;
  rcv_bytes_diff: number;
  link_down: number;
  speed?: string;
  flow_control?: string;
  unicast?: Packages;
  multicast?: Packages;
  broadcast?: Packages;
  pause_frames?: Packages;
}

export interface Packages {
  snd: number;
  rcv: number;
}

export interface LANObject {
  name: string;
  crc?: number;
  drop?: number;
  fragments?: number;
  snd?: number;
  pause_frames?: Packages;
}

export interface WiFiMbssidClient {
  mac: string;
  ip: string;
  flags: string;
  iface: string;
  name: string;
  hostname: string;
  rssi: number;
  lastTxRate: number;
  snd_bytes: number;
  rcv_bytes: number;
  snd_bytes_diff: number;
  rcv_bytes_diff: number;
}

export interface WiFiMbssidObject {
  freq: string;
  channel?: number;
  SSID?: string;
  crc?: number;
  drop?: number;
  snd?: number;
  snd_bytes?: number;
  rcv_bytes?: number;
  snd_bytes_diff?: number;
  rcv_bytes_diff?: number;
  clients?: WiFiMbssidClient[];
  clients_count?: number;
  link_down?: number;
}

export interface WiFiNoise {
  [index: number]: number;
}

export interface WiFiObject {
  mbssid?: WiFiMbssidObject[];
  noise?: WiFiNoise;
}

export interface NATObject {
  peak: number;
  sum: number;
}

export interface LLDPObject {
  switch_mac: string;
  port_description: string;
}

export interface HostLog {
  host: string;
  result: string[];
}

export interface ShortReport {
  _id: string;
  firmware: Firmware;
  mac: string;
  serial?: string;
  syslogHeader: SysLogHeader;
  timestamp: number;
}

export interface Report extends ShortReport {
  uptime: string;
  wan: WANObject;
  lan: LANObject[];
  wifi: WiFiObject;
  nat: NATObject;
  lldp: LLDPObject;
  ping: HostLog[];
  trcrt: HostLog[];
  syslogHeader: SysLogHeader;
}

export interface InfoReport {
  _id: string;
  lan: LANObject[];
  wifi: WiFiObject;
}

export interface SummaryReport extends ShortReport {
  wan: WANObject;
  wifi: WiFiObject;
}

export interface WANReport {
  _id: string;
  wan: WANObject;
  nat: NATObject;
  lldp: LLDPObject;
  timestamp: number;
}

export interface LANReport {
  log?: LANObject;
  timestamp: number;
}

export interface WiFiReport extends WiFiObject {
  log: WiFiMbssidObject[];
  timestamp: number;
  isMultiSSID: boolean;
}

export interface SystemReport {
  _id: string;
  timestamp: number;
}

export interface SearchResultValue {
  value: number;
  time: number;
}

export interface SearchResultObject {
  _id: string;
  model: string[];
  crc: SearchResultValue;
  drop: SearchResultValue;
  '64bytes': SearchResultValue;
  link_down: SearchResultValue;
  fragments: SearchResultValue;
}

export interface SearchFilter {
  [key: string]: any;
}
