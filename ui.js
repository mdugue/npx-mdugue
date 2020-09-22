"use strict";
const React = require("react");
const { Text, Box, Spacer } = require("ink");
const Link = require("ink-link");
const { useRef } = require("react");
const { useSpring, animated, config } = require("react-spring/universal.cjs");
require("raf").polyfill();

const MyLink = ({ url, title }) => (
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

const tagLines = [
  "consumers, experts, bots, ...",
  "React, GraphQL, A11Y, ...",
  "teaching, analyzing, coding, ...",
  "arctic code vault contributer",
];

const Typewriter = () => {
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
  const AnimatedText = animated(Text);

  return (
    <AnimatedText italic>
      {props.length.interpolate((l) => textRef.current.substring(0, l) + " ")}
    </AnimatedText>
  );
};

const App = () => {
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

module.exports = App;
