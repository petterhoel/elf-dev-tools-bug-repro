using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
namespace api;

[EnableCors] 
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


