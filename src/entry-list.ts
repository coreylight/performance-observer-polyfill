export default class EntryList {
  private entries: Entry[];

  public constructor(entries: Entry[]) {
    this.entries = entries;
  }

  public getEntries(): Entry[] {
    return this.entries;
  }

  public getEntriesByType(type: string): Entry[] {
    return this.entries.filter((e): boolean => e.type === type);
  }

  public getEntriesByName(name: string, type?: string): Entry[] {
    return this.entries
      .filter((e): boolean => e.name === name)
      .filter((e): boolean => (type ? e.type === type : true));
  }
}
