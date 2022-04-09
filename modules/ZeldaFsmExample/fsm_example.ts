// States
type TaggedState<S extends string> = { tag: S };

type Wander = TaggedState<"Wander">;
type Attack = TaggedState<"Attack">;
type Evade = TaggedState<"Evade">;
type FindAid = TaggedState<"FindAid">;

// Actions
type TaggedAction<A extends string> = { tag: A };

type SeeEnemy = TaggedAction<"SeeEnemy">;
type LooseEnemy = TaggedAction<"LooseEnemy">;
type EnemyAttacks = TaggedAction<"EnemyAttacks">;
type EnemyIsIdle = TaggedAction<"EnemyIsIdle">;
type HasLowHealth = TaggedAction<"HasLowHealth">;
type HealthRecovered = TaggedAction<"HealthRecovered">;

// typeguards
const isSeeEnemy = (a: Action): a is SeeEnemy => a.tag === "SeeEnemy";
const isLooseEnemy = (a: Action): a is LooseEnemy => a.tag === "LooseEnemy";
const isEnemyAttacls = (a: Action): a is EnemyAttacks =>
  a.tag === "EnemyAttacks";
const isEnemyIsIdle = (a: Action): a is EnemyIsIdle => a.tag === "EnemyIsIdle";
const isHasLowHealth = (a: Action): a is HasLowHealth =>
  a.tag === "HasLowHealth";
const isHealthRecovered = (a: Action): a is HealthRecovered =>
  a.tag === "HealthRecovered";

// state, action and reducer types
type State = Wander | Attack | Evade | FindAid;
type Action =
  | SeeEnemy
  | LooseEnemy
  | EnemyAttacks
  | EnemyIsIdle
  | HasLowHealth
  | HealthRecovered;
type reducer = (action: Action, state: State) => State;

// // reducers
// const reduceWander: reducer = (action, state) => {
//     if (state)
// }

export {};
