import Snowman from "./Snowman";
import { render, fireEvent } from "@testing-library/react";

test('number of wrong guesses cannot exceed max wrong', () => {
  const { container, debug } = render(<Snowman
    images={["img0", "img1", "img2", "img3", "img4", "img5", "img6"]}
    words={["abcd"]}
    maxWrong={6}
  />);
  debug(container);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  // make more than six wrong guesses

  for (let i = 4; i < alphabet.length; i++) {
    const currLetter = container.querySelector(`button[value="${alphabet[i]}"`);
    fireEvent.click(currLetter);
  }

  expect(
    container.querySelector('img[alt="6"]')
  ).toBeInTheDocument();
});
