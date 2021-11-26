using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
namespace api;

[EnableCors] 
[ApiController]
[Route("elf-attribute")]
public class ElfAttributeEndpoint : ControllerBase
{

    [HttpGet(Name = "GetElfAttributes")]
    public async Task<string[]> GetAsync()
    {
        await DummyDelayer.RandomWaitAsync();
        return new string[] {"magical", "fierce", "mystical", "ill tempered", "well mannered", "legendary"};
    }

    [HttpPost(Name = "SaveElfAttribute")]
    public async Task <ElfAttributeSaveRequest> PostAsync([FromBody] ElfAttributeSaveRequest elfAttributes)
    {
        await DummyDelayer.RandomWaitAsync();
        return ElfStore.SaveAttributes(elfAttributes);
    }
}


