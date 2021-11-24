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
