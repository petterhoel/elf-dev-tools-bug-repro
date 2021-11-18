export interface Elf extends ElfBase{
  attributes: string[]
}

export interface ElfBase {
  name: string;
  canFight: boolean;
  id: string;
}

