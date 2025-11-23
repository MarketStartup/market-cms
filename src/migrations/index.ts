import * as migration_20251122_174653 from './20251122_174653';
import * as migration_20251123_184410 from './20251123_184410';

export const migrations = [
  {
    up: migration_20251122_174653.up,
    down: migration_20251122_174653.down,
    name: '20251122_174653',
  },
  {
    up: migration_20251123_184410.up,
    down: migration_20251123_184410.down,
    name: '20251123_184410'
  },
];
