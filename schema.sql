-- 念念 EchoEcho · D1 schema v1.0.0
CREATE TABLE IF NOT EXISTS ee_spaces (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  invite_code TEXT UNIQUE NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS ee_members (
  id TEXT PRIMARY KEY,
  space_id TEXT NOT NULL,
  nickname TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  created_at INTEGER NOT NULL
);

-- 一条「念念」:消息即任务卡
CREATE TABLE IF NOT EXISTS ee_items (
  id TEXT PRIMARY KEY,
  space_id TEXT NOT NULL,
  from_member TEXT NOT NULL,
  to_member TEXT,                            -- NULL = 发给空间内所有其他成员
  kind TEXT NOT NULL DEFAULT 'text',         -- text | voice
  text TEXT NOT NULL,
  audio_key TEXT,
  status TEXT NOT NULL DEFAULT 'received',   -- received(收到) | doing(在办) | done(办妥)
  progress INTEGER NOT NULL DEFAULT 0,       -- 0-100
  note TEXT,                                 -- 办妥附言
  research TEXT NOT NULL DEFAULT 'none',     -- none | wanted | running | done | error
  research_html TEXT,                        -- AI 僚机方案页(完整 HTML)
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- 硬件设备(挂链等):一个 token 绑定一个成员
CREATE TABLE IF NOT EXISTS ee_devices (
  token TEXT PRIMARY KEY,
  member_id TEXT NOT NULL,
  label TEXT,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ee_items_space ON ee_items(space_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ee_members_space ON ee_members(space_id);
