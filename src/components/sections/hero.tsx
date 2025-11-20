export function Hero() {
  return (
    <section id="home" className="flex h-full w-full flex-col justify-center items-center">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up">
            <h1 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
              Farah Nisa
            </h1>
          </div>
          <div className="animate-fade-in-up [animation-delay:200ms]">
            <h2 className="mt-4 font-body text-xl text-primary sm:text-2xl md:text-3xl">
              Software & Cloud Engineer
            </h2>
          </div>
          <div className="animate-fade-in-up [animation-delay:400ms]">
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              I build accessible web experiences with thoughtful design and reliable backend architecture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
