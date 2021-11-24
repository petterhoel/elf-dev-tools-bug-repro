using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
namespace api;

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


