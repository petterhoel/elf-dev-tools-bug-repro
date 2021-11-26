namespace api;

public static  class DummyDelayer
{
    public static async Task RandomWaitAsync()
    {
        await Task.Delay(RandomDelay());
    }

    private static int RandomDelay()
    {
        return (int)new Random().NextInt64(10, 5000);
    }
}