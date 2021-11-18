namespace api;

public record ElfBase(Guid Id, string Name, bool CanFight);
public record Elf(Guid Id, string Name, bool CanFight, string[] Attributes): ElfBase(Id, Name, CanFight);

public record ElfSaveRequest(Guid Id, string Name, bool CanFight) : ElfBase(Id, Name, CanFight);

public record ElfAttributeSaveRequest(Guid ElfId, string[] Attributes);