import assert from "assert";
import { AlphabetSoup } from "../src/alphabetSoup";
describe("AlphabetSoup", function () {
  describe(`
  Case 1 :
  3 3
  OIE
  IIX
  EXE`, function () {
    it("Returns '3' repeated words - SUCCESS", function () {
      const case1 = "1";
      const alphabetSoup = new AlphabetSoup(case1);
      const repeatWords = alphabetSoup.GetSearchWordCount();
      assert.strictEqual(repeatWords, 3);
    });
  });

  describe(`
  Case 2 :
  1 10
  EIOIEIOEIO
  `, function () {
    it("Returns '4' repeated words - SUCCESS", function () {
      const case2 = "2";
      const alphabetSoup = new AlphabetSoup(case2);
      const repeatWords = alphabetSoup.GetSearchWordCount();
      assert.strictEqual(repeatWords, 4);
    });
  });

  describe(`
  Case 3 :
  5 5
  EAEAE
  AIIIA
  EIOIE
  AIIIA
  EAEAE
  `, function () {
    it("Returns '8' repeated words - SUCCESS", function () {
      const case3 = "3";
      const alphabetSoup = new AlphabetSoup(case3);
      const repeatWords = alphabetSoup.GetSearchWordCount();
      assert.strictEqual(repeatWords, 8);
    });
  });

  describe(`
  Case 4 :
  7 2
  OX
  IO
  EX
  II
  OX
  IE
  EX
  `, function () {
    it("Returns '3' repeated words - SUCCESS", function () {
      const case4 = "4";
      const alphabetSoup = new AlphabetSoup(case4);
      const repeatWords = alphabetSoup.GetSearchWordCount();
      assert.strictEqual(repeatWords, 3);
    });
  });

  describe(`
  Case 5 :
  1 1
  E
  `, function () {
    it("Returns '0' repeated words - SUCCESS", function () {
      const case5 = "5";
      const alphabetSoup = new AlphabetSoup(case5);
      const repeatWords = alphabetSoup.GetSearchWordCount();
      assert.strictEqual(repeatWords, 0);
    });
  });
});
