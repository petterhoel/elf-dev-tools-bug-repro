using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
namespace api;

[EnableCors] 
[ApiController]
[Route("elf")]
public class ElfEndpoint : ControllerBase
{

    [HttpGet(Name = "GetElf")]
    public IEnumerable<Elf> Get()
    {
        return ElfStore.AllElves;
    }

    [HttpGet("{id}", Name = "GetElfById")]
    public Elf GetById(Guid id)
    {
        return ElfStore.GetById(id);
    }

    [HttpPost(Name = "SaveElf")]
    public Elf Post([FromBody] ElfSaveRequest elf)
    {
        return ElfStore.Save(elf);
    }

    [HttpDelete("{id}", Name = "DeleteElf")]
    public Elf Delete(Guid id) 
    {
        return ElfStore.Delete(id);
    }
}

[EnableCors] 
[ApiController]
[Route("elf-respawn")]
public class ElfRespawnEndpoint : ControllerBase
{

    [HttpPost(Name = "RespawnElves")]
    public IEnumerable<Elf> Post()
    {
        return ElfStore.ReSpawn();
    }
}

[ApiController]
[Route("elf-attribute")]
public class ElfAttributeEndpoint : ControllerBase
{

    [HttpGet(Name = "GetElfAttributes")]
    public string[] Get()
    {
        return new string[] {"magical", "fierce", "mystical", "ill tempered", "well mannered", "legendary"};
    }

    [HttpPost(Name = "SaveElfAttribute")]
    public ElfAttributeSaveRequest Post([FromBody] ElfAttributeSaveRequest elfAttributes)
    {
        return ElfStore.SaveAttributes(elfAttributes);
    }
}

public static class ElfStore
{
    private static Elf[] OriginalElves {get; } = new Elf[]
    {
            new Elf(Guid.NewGuid(), "Link", true, new string []{"mystical", "legendary"}),
            new Elf(Guid.NewGuid(), "Legolas", true, new string []{"fierce", "popular"}),
            new Elf(Guid.NewGuid(), "Buddy", false, new string []{}),
    };
    private static List<Elf> Elves { get; set; }

    static ElfStore()
    {
       Spawn();
    }

    private static void Spawn()
    {
        Elves = OriginalElves.ToList();
    }
    public static List<Elf> ReSpawn() {
        Spawn();
        return AllElves;
    }

    public static List<Elf> AllElves => Elves;
    public static Elf GetById(Guid id) => Elves.Single(elf => elf.Id == id);
    public static Elf Delete(Guid id) 
    {
        var elf = GetById(id);
        if (elf is null)
        {
            return null;
        }
        Elves.Remove(elf);
        return elf;
    }
    public static Elf Save(ElfSaveRequest toSave) 
    {
        try 
        {
            if (Guid.Empty == toSave.Id) 
            {
               toSave = toSave with { Id = Guid.NewGuid() };
            }
            var elf = GetById(toSave.Id);
            var index = Elves.IndexOf(elf);
            Elves[index] = elf with { Name = toSave.Name, CanFight = toSave.CanFight };
        }

        catch (InvalidOperationException)
        {
                throw new NoElfExistsException();
        }
        catch (NoElfExistsException) 
        {
            Elves.Add(new Elf(toSave.Id, toSave.Name, toSave.CanFight, Array.Empty<string>()));
        }
        return GetById(toSave.Id);
    }
    public static ElfAttributeSaveRequest SaveAttributes(ElfAttributeSaveRequest saveRequest) 
    {
        var elfIndex = Elves.FindIndex(elf => elf.Id == saveRequest.ElfId);
        var dbElf = GetById(saveRequest.ElfId);
        var newElf = dbElf with { Attributes = saveRequest.Attributes }; 
        Elves[elfIndex] = newElf;
        return new ElfAttributeSaveRequest(newElf.Id, newElf.Attributes);
    }
}


public class NoElfExistsException: Exception {}