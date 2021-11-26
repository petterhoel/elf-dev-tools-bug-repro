using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
namespace api;

[EnableCors] 
[ApiController]
[Route("elf-respawn")]
public class ElfRespawnEndpoint : ControllerBase
{

    [HttpPost(Name = "RespawnElves")]
    public async Task<IEnumerable<Elf>> PostAsync()
    {
        await DummyDelayer.RandomWaitAsync();
        return ElfStore.ReSpawn();
    }
}


