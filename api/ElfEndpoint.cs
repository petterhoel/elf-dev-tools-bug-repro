using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
namespace api;

[EnableCors] 
[ApiController]
[Route("elf")]
public class ElfEndpoint : ControllerBase
{

    [HttpGet(Name = "GetElf")]
    public async Task<IEnumerable<Elf>> GetAsync()
    {
        await DummyDelayer.RandomWaitAsync();
        return ElfStore.AllElves;
    }

    [HttpGet("{id}", Name = "GetElfById")]
    public async Task<Elf> GetByIdAsync(Guid id)
    {
        await DummyDelayer.RandomWaitAsync();
        return ElfStore.GetById(id);
    }

    [HttpPost(Name = "SaveElf")]
    public async Task<Elf> PostAsync([FromBody] ElfSaveRequest elf)
    {
        await DummyDelayer.RandomWaitAsync();
        return ElfStore.Save(elf);
    }

    [HttpDelete("{id}", Name = "DeleteElf")]
    public async Task<Elf> DeleteAsync(Guid id) 
    {
        await DummyDelayer.RandomWaitAsync();
        return ElfStore.Delete(id);
    }
}
