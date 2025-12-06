import * as migration_20251122_174653 from './20251122_174653';
import * as migration_20251123_184410 from './20251123_184410';
import * as migration_20251128_121218 from './20251128_121218';
import * as migration_20251201_150040 from './20251201_150040';
import * as migration_20251206_135206 from './20251206_135206';
import * as migration_20251206_140808 from './20251206_140808';
import * as migration_20251206_141144 from './20251206_141144';

export const migrations = [
  {
    up: migration_20251122_174653.up,
    down: migration_20251122_174653.down,
    name: '20251122_174653',
  },
  {
    up: migration_20251123_184410.up,
    down: migration_20251123_184410.down,
    name: '20251123_184410',
  },
  {
    up: migration_20251128_121218.up,
    down: migration_20251128_121218.down,
    name: '20251128_121218',
  },
  {
    up: migration_20251201_150040.up,
    down: migration_20251201_150040.down,
    name: '20251201_150040',
  },
  {
    up: migration_20251206_135206.up,
    down: migration_20251206_135206.down,
    name: '20251206_135206',
  },
  {
    up: migration_20251206_140808.up,
    down: migration_20251206_140808.down,
    name: '20251206_140808',
  },
  {
    up: migration_20251206_141144.up,
    down: migration_20251206_141144.down,
    name: '20251206_141144'
  },
];
