
/**
 * simple & playful businesscard that is shown when a user types `npx @mdugue/fyi` into its terminal.
 * Displays links to my most relevant urls, such as private homepage, LinkedIn etc…
 * Got some animation sugar, rather as a silly proof of technical expertise than real value… well actually it's a bit fun though.
 * Animations are applied via `react-spring`
 */
"use strict";
const React = require("react");
const { Text, Box, Spacer } = require("ink");
const Link = require("ink-link");
const { useRef } = require("react");
const { useSpring, animated, config } = require("react-spring/universal.cjs");
require("raf").polyfill();

/**
 * Bootstraps the structure containing mostly `Text` and `Box` components from `ink` 
 * plus some custom ones.
 */
function App() {
  return (
    <Box justifyContent="center">
      <Box
        width={80}
        paddingLeft={4}
        paddingRight={4}
        margin={2}
        paddingBottom={1}
        paddingTop={2}
        borderStyle="single"
        borderColor="#d36969"
        flexDirection="column"
      >
        <Text italic dimColor>
          – since 2008 –
        </Text>
        <Text>
          <Text color="#d36969" bold>
            handcrafting web experiences for everybody
          </Text>
        </Text>
        <Typewriter />
        <Text> </Text>
        <MyLink url="https://github.com/mdugue" title="  github" />
        <MyLink url="https://linkedin.com/in/manuel-dugue/" title="linkedin" />
        <MyLink url="https://twitter.com/mdugue" title=" twitter" />
        <MyLink url="https://manuel.fyi" title="     web" />
        <Text> </Text>
        <Box alignItems="center" justifyContent="center">
          <Text bold>Manuel Dugué</Text>
        </Box>
      </Box>
    </Box>
  );
};

/**
 * Thats how the links should look like including their description
 */
function MyLink({ url, title }) {
  return (
    <Text>
      <Text bold>{title}</Text>
      {"  "}
      <Text color="#f2dc8c">
        <Link fallback={false} url={url}>
          {url}
        </Link>
      </Text>
    </Text>
  );
}

/**
 * the tag lines to animate in the `Typewriter` component.
 */
const tagLines = [
  "consumers, experts, bots, ...",
  "React, GraphQL, A11Y, ...",
  "teaching, analyzing, coding, ...",
  "arctic code vault contributer",
];
const AnimatedText = animated(Text);

/**
 * Animated tag lines inspired by a typewriter.
 * 
 * Uses `react-spring` for timing and the heavy animation lifting.
 * switching between the different tagLines is done imperatively with the help of `await next`
 */
function Typewriter() {
  const textRef = useRef("");

  const props = useSpring({
    config: { ...config.slow },
    from: { length: 0 },
    to: async (next) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      for (textRef.current of tagLines) {
        await next({ length: textRef.current.length + 1 });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await next({ length: 0 });
      }
      textRef.current = tagLines[0];
      await next({ length: textRef.current.length + 1 });
    },
  });

  return (
    <AnimatedText italic>
      {props.length.interpolate((l) => textRef.current.substring(0, l) + " ")}
    </AnimatedText>
  );
}


module.exports = App;
