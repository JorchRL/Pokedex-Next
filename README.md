# Pokedex-Next
A Pokédex App using Next.js, TailwindCSS and the GraphQL PokeAPI

By Jorge Romero :3

## How I worked on this

I wanted to learn how to design an app as well as how to build it. I decided on a pokedex because it is something I use when playing pokemon games. I am writing a series of posts in my blog about every stage of this project.

Design: https://jorgerl.hashnode.dev/how-to-think-and-learn-about-design-also-im-designing-and-building-a-pokedex

## Why I built it this way?

The three main design priorities I had were (1) having a seamless experience with the interaction with the app, (2) an interface optimized for quick look up, and (3) having only relevant information.

These guided my decision-making when building the app.

### Interaction loop
(1) I decided to use a custom-built FSM to drive the interaction flow of the entire app. This is because I want to have some assurances that the flow will not behave in unexpected manners. I implemented discriminated union types in TypeScript for this. It is strongly typed and purely functional. So the state must be managed with other solution.

(2) For wiring up the FSM to the app I choose to try [Zustand](https://github.com/pmndrs/zustand) and react's ContextAPI. And see which one works best for my app (WIP). Redux was not a good match for this because this is a very simple state and I also want to be able to have manually-set constraints over the FSM behaviour.

### Interface flow (WIP)
(1) I want a very simple single page application. So I decided to use a 3-component page. There is a "Search bar", "Pokemon Info" and "Map" component. Each will behave and look according to the "paper page" material metaphor from google's material design.

(2) The FSM state will be received by each of these components and they will behave accordingly.

(3) These components can also send actions to the FSM reducer function. Its output will be used to change the state. As the FSM is purely functional, the state-changing logic will be handled by a "store". Either with react's Context API or with Zustand.

### Visual design (WIP)
(1) I wanted my pokedex to look like pokemon sword and shield's pokedex.
(2) I am using TailwindCSS 
(3) I want to implement animations. Either CSS animation or with Framer Motion. 

### Data fetching (WIP)
(1) I want to use the PokeAPI's GraphQL API.

## What did I learn

(1) I learned about how Haskell handles Sum Types (aka union types). And how it is very different from how TypeScript does it. The FSM I am using needs "discriminated" union types. So I implemented them in TypeScript.

(2) I built a functional FSM with "reducer" functions to act as the FSM's transition function. 

(3) I learned a lot about how state management with Next.js (and react in general). Without Redux.

## If I had more time...

I haven't finished this project :D


# License

Use it however you like. MIT license.