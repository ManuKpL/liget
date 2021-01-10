export class Musician {
  public constructor(public readonly name: string) {}

  public ready(): string {
    return 'Yeah!';
  }

  public greet(name: string): string {
    return `Hello ${name}, I'm ${this.name}!`;
  }

  public introduce(name: string, age: number, sings = false): string {
    return `This is ${name}, a ${age} years old ${sings ? 'singer' : 'musician'}`;
  }

  public plays(styles: string[]): string {
    const formattedStyles = styles.reduce((joined, style, index) => {
      if (!joined) {
        return style;
      }

      const isLast = index === styles.length - 1;
      const separator = isLast ? ' & ' : ', ';
      return joined + separator + style;
    }, '');
    return `I play ${formattedStyles || 'all'} music`;
  }
}
