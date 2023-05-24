import Snowman from "./Snowman";
import { render, fireEvent } from "@testing-library/react";

const SNOWMAN_PROPS = {
  images: ["img0", "img1", "img2", "img3", "img4", "img5", "img6"],
  words: ["abcd"],
  maxWrong: 6,
};

test("number of wrong guesses cannot exceed max wrong", () => {
  const maxWrong = 6;
  const { container, debug } = render(
    <Snowman
      images={SNOWMAN_PROPS.images}
      words={SNOWMAN_PROPS.words}
      maxWrong={SNOWMAN_PROPS.maxWrong}
    />
  );
  debug(container);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  // make more than six wrong guesses

  for (let i = 4; i < maxWrong + 4; i++) {
    const currLetter = container.querySelector(`button[value="${alphabet[i]}"`);
    fireEvent.click(currLetter);
  }

  const image = container.querySelector("img");
  const nWrong = Number(image.alt);

  expect(nWrong).toBe(maxWrong);
  expect(container).toContainHTML("You lose");
  // expect(container.querySelector(".Snowman-button-area")).not.toBeInTheDocument()
  // expect(container).toMatchSnapshot();
});

// describe("snapshot tests", function () {
//   it("Snowman component initial render matches snapshot", function () {
//     const { container } = render(
//       <Snowman
//         images={SNOWMAN_PROPS.images}
//         words={SNOWMAN_PROPS.words}
//         maxWrong={SNOWMAN_PROPS.maxWrong}
//       />
//     );

//     expect(container).toMatchSnapshot();
//   });
// });
