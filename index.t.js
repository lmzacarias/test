xdescribe("Prueba", () => {
  describe("Sumar", () => {
    it("suma de 2 numero", () => {
      const suma = (a, b) => {
        return a + b;
      };
      expect(suma(1, 2)).toEqual(3);
    });
  });
});
