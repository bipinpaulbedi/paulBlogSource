---
title: phoenix/elixir - concurrency actor model with 'let it crash' philosophy
categories: technology
tags: [elixir, phoenix, actor-model, design-patterns, functional-programming, article]
comments: true
subTitle: concurrent and/or parallel processing model
date: "2019-01-04T00:00:00.000Z"
---

A concurrent program has multiple logical threads of control. These threads may or may not run in parallel. A parallel program potentially runs more quickly than a sequential program by executing different parts of the computation simultaneously (in parallel). It may or may not have more than one logical thread of control. An alternative way of thinking about this is that concurrency is an aspect of the problem domain—your program needs to handle multiple simultaneous (or near-simultaneous) events. Parallelism, by contrast, is an aspect of the solution domain—you want to make your program faster by processing different portions of the problem in parallel.

Functional programming avoids the problems associated with shared mutable state by avoiding mutable state. Actor programming, by contrast, retains mutable state but avoids sharing it. An actor is like an object in an object-oriented (OO) program—it encapsulates state and communicates with other actors by exchanging messages. The difference is that actors run concurrently with each other and, unlike OO-style message passing (which is really just calling a method), actors really communicate by sending messages to each other.

Certainly, there are some concurrent programs that will always be nondeterministic. And this is unavoidable—some problems require solutions that are intrinsically dependent on the details of timing. But it’s not the case that all parallel programs are necessarily nondeterministic. The value of the sum of the numbers between 0 and 10,000 won’t change just because we add those numbers together in parallel instead of sequentially

Microsoft [Orleans](https://dotnet.github.io/orleans/) is .net implementation of Actor Model but we will focus on programming language which was build with focus on concurrent execution. Elixir/Erlang: Erlang is a programming language used to build massively scalable soft real-time systems with requirements on high availability. Some of its uses are in telecoms, banking, e-commerce, computer telephony and instant messaging. Erlang's runtime system has built-in support for concurrency, distribution and fault tolerance.
OTP is set of Erlang libraries and design principles providing middle-ware to develop these systems. It includes its own distributed database, applications to interface towards other languages, debugging and release handling tools. Erlang runs on VM called BEAM which is esentially a [process virtual machine](https://en.wikipedia.org/wiki/Virtual_machine)

`In Erlang, and therefore Elixir, an actor is called a process. In most environments a process is a heavyweight entity that consumes lots of resources and is expensive to create. An Elixir process, by contrast, is very lightweight—lighter weight even than most systems’ threads, both in terms of resource consumption and startup cost. Elixir programs typically create thousands of processes without problems and don’t normally need to resort to the equivalent of thread pools`

**Elixir actor by example**  

Elixir actors communicate via message passing using mailboxes, which are queues by data structure. For our example we will create a md5 hash generater which based on a string return a md5 value of string. If the value is already exiting it will not recompute to save cpu resource but send it from in memory cache.

`defmodule HashIt do`  
&nbsp;&nbsp;&nbsp;&nbsp;`def loop do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`receive do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{:compute, value} -> IO.puts("#{value}")` will replace #{value} with computed hash function  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`loop`  
&nbsp;&nbsp;&nbsp;&nbsp;`end`  
`end`  
`----------`  
`pid = spawn(&HashIt.loop/0)`  
`send(pid, {:compute, "bipin"})`  
`sleep(1000)`  

This function implements an infinite loop by calling itself recursively. The receive block waits for a message and then uses pattern matching to work out how to handle it.  Elixir implements tail-call elimination. Tail-call elimination, as its name suggests, replaces a recursive call with a simple jump if the last thing the function does is call itself, thus infinite recursive call o loop function will not result in stack overflow.

`defmodule HashIt do`  
&nbsp;&nbsp;&nbsp;&nbsp;`def loop do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`receive do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{:compute, value} -> IO.puts(:crypto.hash(:md5, value) |> Base.encode16())`     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{:shutdown} ->  -> exit(:normal)`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`loop`  
&nbsp;&nbsp;&nbsp;&nbsp;`end`  
`end`  
`----------`  
`receive do`  
&nbsp;&nbsp;&nbsp;&nbsp;`{:EXIT, ^pid, reason} -> IO.puts("HasIt has exited (#{reason})")`  
`end`

`Process.flag(:trap_exit, true)`  
`pid = spawn_link(&HashIt.loop/0)`  
`send(pid, {:compute, "bipin"})`  
`send(pid, {:shutdown}`  

**Adding state to the actor**  

We will add a variable to store all values sent and their computed hash

`defmodule HashIt do`  
&nbsp;&nbsp;&nbsp;&nbsp;`def loop(strg) do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`receive do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{:compute, value} -> `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`hashValue = :crypto.hash(:md5 , value) |> Base.encode16()`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`updatedStrg = strg.put(strg, value, hashValue)`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IO.puts(hashValue)`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`loop(updatedStrg)`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`loop`  
&nbsp;&nbsp;&nbsp;&nbsp;`end`  
`end`  

Here Strg is an elixir Map and we can start the process by using  

`pid = spawn(HashIt, :loop, [%{}])`  

or we can define methods to start, compute also provide it a name instead of using pid by registering it.  

`defmodule HashIt do`  
&nbsp;&nbsp;&nbsp;&nbsp;`def start(name, strg, cryptoType) do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`pid = spawn(__MODULE__, :loop, [strg, cryptoType])`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Process.register(pid, name)`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`pid`  
&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;`def compute(name, value) do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ref = make_ref()`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`send(name, {:compute, value, self(), ref})`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`receive do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{:ok, ^ref, reply} -> reply`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;`def loop(strg, cryptoType) do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`receive do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{:compute, value, sender, ref} -> `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`hashValue = :crypto.hash(cryptoType , value) |> Base.encode16()`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`updatedStrg = Map.put_new(strg, value, hashValue)`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`send(sender, {:ok, ref, hashValue})`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`loop(updatedStrg, cryptoType)`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`loop`  
&nbsp;&nbsp;&nbsp;&nbsp;`end`  
`end`  

The program can be started via start method and uses pseudo-variable __MODULE__, which evaluates to the name of the current module. The Process.register registers the pid as name :hashit. Moreover instead of printing the hash value it now returs it to the sender, which helps in bi-directional communication. The carot ^ symbol in {:ok, ^ref, reply} denotes we want to match the value rather than binding it. The [pattern matching](https://elixir-lang.org/getting-started/pattern-matching.html) in elixir is used to match inside a data structure. Effectively we can now execute the HashIt module via

`:hashItMD5 |> HashIt.start([%{}, :md5])`  
`:hashItMD5 |> HashIt.compute("bipin")`

**Adding check and compute logic**  

Adding the return value to check in cache befor recomputing above module can be refactured as

`defmodule HashIt do`  
&nbsp;&nbsp;&nbsp;&nbsp;`def start(name, strg, cryptoType) do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`pid = spawn(__MODULE__, :loop, [strg, cryptoType])`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Process.register(pid, name)`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`pid`  
&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;`def compute(name, value) do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ref = make_ref()`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`send(name, {:compute, value, self(), ref})`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`receive do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{:ok, ^ref, reply} -> reply`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;`def loop(strg, cryptoType) do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`receive do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{:compute, value, sender, ref} -> `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`result = Map.fetch(strg, value)`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`case result do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{:ok, val} -> send(sender, {:ok, ref, val})`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`loop(strg, cryptoType)`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{:error, _reason} ->`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`hashValue = :crypto.hash(cryptoType , value) |> Base.encode16()`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`updatedStrg = Map.put_new(strg, value, hashValue)`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`send(sender, {:ok, ref, hashValue})`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`loop(updatedStrg, cryptoType)`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`loop`  
&nbsp;&nbsp;&nbsp;&nbsp;`end`  
`end`  

**Making it fault tolerant**  

Thus various processes can be started in parallel for different crypto compute example MD5, SHA128, SHA256. Using the above process mechanism we can create multiple processes for different or same task resulting in both concurrent and parallel deterministic outputs. But this architecture does not provide fault tolerance. What is there is an error and it is aborted abruptly ? Elixir provides a mechanism to link to process which is by directional.  

`:hashItMD5 |> HashIt.start([%{}, :md5])`  
`:hashItSHA256 |> HashIt.start([%{}, :sha256])`  
`:hashItMD5 |> Process.link(:hashItSHA256)`  
`:hashItMD5 |> exit(:forced_kill)`  

Since we are using spawn in our hashWe can also use spawn_link method to link process instead of process.link. Please note links created are bi directional. and calling abnormal exit on :hashItMD5 will also set :hashItSHA256 to nil  

`Process.info(:hashItMD5, :status)`  
<small>nil</small>  
`Process.info(:hashItSHA256, :status)`  
<small>nil</small>  

but normal exit will keep the linked process active, viz:  
`:hashItMD5 |> exit(:normal)`  
`Process.info(:hashItMD5, :status)`  
<small>nil</small>  
`Process.info(:hashItSHA256, :status)`  
<small>{:status, :waiting}</small>  

This implies we can set the system trap to capture other processes exit, when can be utilized to create suprevisor and re start the system if the process crashes. We can set Process.flag(:trap_exit, true) to capture the exit of linked process and take appropriate action. In our example of HashIt a supervisor can be created as:  

`defmodule HashItSupervisor do`  
&nbsp;&nbsp;&nbsp;&nbsp;`def start do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`spawn(__MODULE__, :loop_system,[])`  
&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;`def loop_system do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Process.flag(:trap_exit, true)`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`loop`  
&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;`def loop do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`pid = HashIt.start(%{}, :md5)` // instead of using spawn please change it to spawn_link in HashIt module  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`receive do`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{:EXIT, ^pid, :normal} -> IO.puts("Hash It exited normally")`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`:ok`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{:EXIT, ^pid, reason} -> IO.puts("Hash It failed withreason #{inspect reason}...restarting")`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`loop`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`end`  
&nbsp;&nbsp;&nbsp;&nbsp;`end`  
`end`  
`----------`  
`HashItSupervisor.start`  

If the HashIt system now crashes it is captured by HashItSupervisor and is restarted. If the two processes are dependent on each other and can result in deadlock or infinite waiting because of crashing of sender the receiver can be guraded using timeout clause in receive do loop by using after clause. example:

`receive do`  
&nbsp;&nbsp;&nbsp;&nbsp;`{:ok, ^ref, value} -> IO.puts(value)`  
&nbsp;&nbsp;&nbsp;&nbsp;`after 1000 -> nil`  
`end`  

**Scaling to multiple nodes/computers**  

The actor programming naturally supports an approach to writing fault-tolerant code that leverages this observation: the error-kernel pattern. In the elixir system the kernal is the root supervisor which can start other supervisors or workers. When we create an elixir virtual machine we create a node we can create nodes multiple nodes on same system or on network of computer by naming them using --name or --sname option. To make multiple nodes part of same cluster it must use same --cookie name argument. This is results in running your system across multiple systems. To multiple connect nodes we can use connect function

`iex(node1@192.168.0.10)1> Node.self`  
<small>:"node1@192.168.0.10"</small>  
`iex(node1@192.168.0.10)2> Node.list`  
<small>[]</small>  
`iex(node1@192.168.0.10)3> Node.connect(:"node2@192.168.0.20")`  
<small>true</small>  
`iex(node1@192.168.0.10)4> Node.list`  
<small>[:"node2@192.168.0.20"]</small>  

Now use Node.Spwan to start worker or supervisors and use :global.register_name() instead of Process.register() to make names cluster global. 

**Important notes**  

For ths explanatory purpose we used dynamic atom naming above. However, naming dynamic processes with atoms is a terrible idea! If we use atoms, we would need to convert the name (often received from an external client) to atoms, and we should never convert user input to atoms. This is because atoms are not garbage collected. Once an atom is created, it is never reclaimed. Generating atoms from user input would mean the user can inject enough different names to exhaust our system memory!  

In practice, it is more likely you will reach the Erlang VM limit for the maximum number of atoms before you run out of memory, which will bring your system down regardless. Morover Supervisor model used above can result in inconsistent naming convention across various modules and libraries. Thus elixir provides a standard protocol to defining,starting and maintaing workers using efficient buketed methodologyusing [GenServer](https://elixir-lang.org/getting-started/mix-otp/genserver.html), provding standard call, cast and info method implementation for various operation.