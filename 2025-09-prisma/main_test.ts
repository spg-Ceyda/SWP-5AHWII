import { assertEquals } from "@std/assert";

Deno.test("addTest", () => {
  const result = 1 + 1;
  assertEquals(result, 2);
});
