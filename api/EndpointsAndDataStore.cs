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
    private static List<Elf> Elves { get; set; }

    static ElfStore()
    {
        Elves = new List<Elf> 
        {
             new Elf(Guid.NewGuid(), "Link", true, new string []{"mystical", "legendary"}),
             new Elf(Guid.NewGuid(), "Legolas", true, new string []{"fierce", "popular"}),
             new Elf(Guid.NewGuid(), "Buddy", false, new string []{}),
        };
    }
    public static List<Elf> AllElves => Elves;
    public static Elf GetById(Guid id) => Elves.Single(elf => elf.Id == id);
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
            Elves[index] = elf;
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