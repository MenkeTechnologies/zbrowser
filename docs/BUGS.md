https://chromewebstore.google.com/top-charts/popular Cmd K blocked

-------------------------------------
Translated Report (Full Report Below)
-------------------------------------
Process:             zwire [2230]
Path:                /Applications/zwire.app/Contents/Resources/browser/zwire.app/Contents/MacOS/zwire
Identifier:          com.menketechnologies.zwire
Version:             150.0.7871.46 (7871.46)
Code Type:           ARM-64 (Native)
Role:                Foreground
Parent Process:      launchd [1]
Coalition:           com.menketechnologies.zwire [102525]
User ID:             501

Date/Time:           2026-07-08 18:09:21.9265 -0400
Launch Time:         2026-07-08 17:17:06.3185 -0400
Hardware Model:      Mac17,6
OS Version:          macOS 26.5.1 (25F80)
Release Type:        User

Crash Reporter Key:  1B401E12-C26D-14C8-52DB-8E806980D459
Incident Identifier: A0971704-83A5-4BD3-AF83-8816D0E77FAA

Sleep/Wake UUID:       FCF7764E-2FC8-47E1-9DB2-B787603D34F4

Time Awake Since Boot: 140000 seconds
Time Since Wake:       25504 seconds

System Integrity Protection: enabled

Triggered by Thread: 0  CrBrowserMain, Dispatch Queue: com.apple.main-thread

Exception Type:    EXC_BREAKPOINT (SIGTRAP)
Exception Codes:   0x0000000000000001, 0x0000000116057fd0

Termination Reason:  Namespace SIGNAL, Code 5, Trace/BPT trap: 5
Terminating Process: exc handler [2230]


Thread 0 Crashed:: CrBrowserMain Dispatch queue: com.apple.main-thread
0   zwire Framework               	       0x116057fd0 content::RenderFrameHostImpl::IsSandboxed(network::mojom::WebSandboxFlags) + 92
1   zwire Framework               	       0x11667661c extensions::ExtensionFunctionDispatcher::DispatchWithCallbackInternal(mojo::StructPtr<extensions::mojom::RequestParams>, content::RenderFrameHost*, content::RenderProcessHost&, base::OnceCallback<void (ExtensionFunction::ResponseType, base::ListValue, std::__Cr::basic_string<char, std::__Cr::char_traits<char>, std::__Cr::allocator<char>> const&, mojo::StructPtr<extensions::mojom::ExtraResponseData>)>) + 1588
2   zwire Framework               	       0x116675cb0 extensions::ExtensionFunctionDispatcher::Dispatch(mojo::StructPtr<extensions::mojom::RequestParams>, content::RenderFrameHost&, base::OnceCallback<void (bool, base::ListValue, std::__Cr::basic_string<char, std::__Cr::char_traits<char>, std::__Cr::allocator<char>> const&, mojo::StructPtr<extensions::mojom::ExtraResponseData>)>) + 396
3   zwire Framework               	       0x11666f68c extensions::ExtensionFrameHost::Request(mojo::StructPtr<extensions::mojom::RequestParams>, base::OnceCallback<void (bool, base::ListValue, std::__Cr::basic_string<char, std::__Cr::char_traits<char>, std::__Cr::allocator<char>> const&, mojo::StructPtr<extensions::mojom::ExtraResponseData>)>) + 84
4   zwire Framework               	       0x11672ffd4 extensions::mojom::LocalFrameHostStubDispatch::AcceptWithResponder(extensions::mojom::LocalFrameHost*, mojo::Message*, std::__Cr::unique_ptr<mojo::MessageReceiverWithStatus, std::__Cr::default_delete<mojo::MessageReceiverWithStatus>>) + 644
5   zwire Framework               	       0x118a04a08 mojo::InterfaceEndpointClient::HandleValidatedMessage(mojo::Message*) + 800
6   zwire Framework               	       0x118a093d8 mojo::MessageDispatcher::Accept(mojo::Message*) + 168
7   zwire Framework               	       0x118a05de8 mojo::InterfaceEndpointClient::HandleIncomingMessage(mojo::Message*) + 72
8   zwire Framework               	       0x1198120d8 IPC::ChannelAssociatedGroupController::AcceptOnEndpointThread(mojo::Message, IPC::(anonymous namespace)::ScopedUrgentMessageNotification) + 268
9   zwire Framework               	       0x1198126dc base::internal::Invoker<base::internal::FunctorTraits<void (IPC::ChannelAssociatedGroupController::*&&)(mojo::Message, IPC::(anonymous namespace)::ScopedUrgentMessageNotification), IPC::ChannelAssociatedGroupController*&&, mojo::Message&&, IPC::(anonymous namespace)::ScopedUrgentMessageNotification&&>, base::internal::BindState<true, true, false, void (IPC::ChannelAssociatedGroupController::*)(mojo::Message, IPC::(anonymous namespace)::ScopedUrgentMessageNotification), scoped_refptr<IPC::ChannelAssociatedGroupController>, mojo::Message, IPC::(anonymous namespace)::ScopedUrgentMessageNotification>, void ()>::RunOnce(base::internal::BindStateBase*) + 88
10  zwire Framework               	       0x1187a0220 base::TaskAnnotator::RunTaskImpl(base::PendingTask&) + 352
11  zwire Framework               	       0x1187b81e4 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::DoWorkImpl(base::LazyNow*) + 764
12  zwire Framework               	       0x1187b7dd4 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::DoWork() + 92
13  zwire Framework               	       0x118806804 base::MessagePumpCFRunLoopBase::RunWork() + 152
14  zwire Framework               	       0x118801fd8 base::apple::CallWithEHFrame(void () block_pointer) + 16
15  zwire Framework               	       0x118805e1c base::MessagePumpCFRunLoopBase::RunDelayedWorkTimer(__CFRunLoopTimer*, void*) + 60
16  CoreFoundation                	       0x188bb4318 __CFRUNLOOP_IS_CALLING_OUT_TO_A_TIMER_CALLBACK_FUNCTION__ + 32
17  CoreFoundation                	       0x188bb4010 __CFRunLoopDoTimer + 980
18  CoreFoundation                	       0x188bb3b88 __CFRunLoopDoTimers + 280
19  CoreFoundation                	       0x188b99c38 __CFRunLoopRun + 1816
20  CoreFoundation                	       0x188c6c1c4 _CFRunLoopRunSpecificWithOptions + 532
21  HIToolbox                     	       0x19597f560 RunCurrentEventLoopInMode + 320
22  HIToolbox                     	       0x1959828bc ReceiveNextEventCommon + 488
23  HIToolbox                     	       0x195b0c14c _BlockUntilNextEventMatchingListInMode + 48
24  AppKit                        	       0x18d67435c _DPSBlockUntilNextEventMatchingListInMode + 228
25  AppKit                        	       0x18cfc8084 _DPSNextEvent + 576
26  AppKit                        	       0x18db5d8b0 -[NSApplication(NSEventRouting) _nextEventMatchingEventMask:untilDate:inMode:dequeue:] + 688
27  AppKit                        	       0x18db5d5bc -[NSApplication(NSEventRouting) nextEventMatchingMask:untilDate:inMode:dequeue:] + 72
28  zwire Framework               	       0x11a582214 __64-[CrApplication nextEventMatchingMask:untilDate:inMode:dequeue:]_block_invoke + 64
29  zwire Framework               	       0x118801fd8 base::apple::CallWithEHFrame(void () block_pointer) + 16
30  zwire Framework               	       0x11a58215c -[CrApplication nextEventMatchingMask:untilDate:inMode:dequeue:] + 176
31  AppKit                        	       0x18cfbb13c -[NSApplication run] + 368
32  zwire Framework               	       0x118806f7c base::MessagePumpNSApplication::DoRun(base::MessagePump::Delegate*) + 284
33  zwire Framework               	       0x1188057e0 base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*) + 212
34  zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
35  zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
36  zwire Framework               	       0x115b505e4 content::BrowserMainLoop::RunMainMessageLoop() + 184
37  zwire Framework               	       0x115b51cd8 content::BrowserMainRunnerImpl::Run() + 24
38  zwire Framework               	       0x115b4e320 content::BrowserMain(content::MainFunctionParams) + 132
39  zwire Framework               	       0x117a59adc content::RunBrowserProcessMain(content::MainFunctionParams, content::ContentMainDelegate*) + 164
40  zwire Framework               	       0x117a5ae38 content::ContentMainRunnerImpl::RunBrowser(content::MainFunctionParams, bool) + 1176
41  zwire Framework               	       0x117a5a950 content::ContentMainRunnerImpl::Run() + 596
42  zwire Framework               	       0x117a59380 content::RunContentProcess(content::ContentMainParams, content::ContentMainRunner*) + 1308
43  zwire Framework               	       0x117a594ec content::ContentMain(content::ContentMainParams) + 100
44  zwire Framework               	       0x1130a4d34 ChromeMain + 436
45  zwire                         	       0x1005fc8b8 main + 288
46  dyld                          	       0x18871fe00 start + 6992

Thread 1:
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11defd10c crashpad::MachMessageWithDeadline(mach_msg_header_t*, int, unsigned int, unsigned int, unsigned long long, unsigned int, bool) + 448
5   zwire Framework               	       0x11defe5fc crashpad::(anonymous namespace)::MachMessageAllocateReceive(crashpad::(anonymous namespace)::MachMessageBuffer*, int, unsigned int, unsigned int, unsigned long long, unsigned int, bool) + 200
6   zwire Framework               	       0x11defe2a0 crashpad::MachMessageServer::Run(crashpad::MachMessageServer::Interface*, unsigned int, int, crashpad::MachMessageServer::Persistent, crashpad::MachMessageServer::ReceiveLarge, unsigned int) + 288
7   zwire Framework               	       0x11df011dc crashpad::(anonymous namespace)::HandlerStarter::RestartThreadMain(void*) + 68
8   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
9   libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 2:: com.apple.NSEventThread
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   CoreFoundation                	       0x188b9b0d8 __CFRunLoopServiceMachPort + 160
5   CoreFoundation                	       0x188b999c4 __CFRunLoopRun + 1188
6   CoreFoundation                	       0x188c6c1c4 _CFRunLoopRunSpecificWithOptions + 532
7   AppKit                        	       0x18d0e9c7c _NSEventThread + 184
8   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
9   libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 3:: HangWatcher
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187d0e14 base::HangWatcher::Wait() + 156
7   zwire Framework               	       0x1187d0f5c base::HangWatcher::Run() + 72
8   zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
9   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
10  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 4:: PerfettoTrace
0   libsystem_kernel.dylib        	       0x188aa5ba8 kevent64 + 8
1   zwire Framework               	       0x1188191b8 base::MessagePumpKqueue::DoInternalWork(base::MessagePump::Delegate*, base::MessagePump::Delegate::NextWorkInfo*) + 176
2   zwire Framework               	       0x1188190c4 base::MessagePumpKqueue::Run(base::MessagePump::Delegate*) + 232
3   zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
4   zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
5   zwire Framework               	       0x1187d71b8 base::Thread::Run(base::RunLoop*) + 60
6   zwire Framework               	       0x1187d7384 base::Thread::ThreadMain() + 444
7   zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
8   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
9   libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 5:: ThreadPoolServiceThread
0   libsystem_kernel.dylib        	       0x188aa5ba8 kevent64 + 8
1   zwire Framework               	       0x1188191b8 base::MessagePumpKqueue::DoInternalWork(base::MessagePump::Delegate*, base::MessagePump::Delegate::NextWorkInfo*) + 176
2   zwire Framework               	       0x1188190c4 base::MessagePumpKqueue::Run(base::MessagePump::Delegate*) + 232
3   zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
4   zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
5   zwire Framework               	       0x1187d71b8 base::Thread::Run(base::RunLoop*) + 60
6   zwire Framework               	       0x1187c3824 base::internal::ServiceThread::Run(base::RunLoop*) + 16
7   zwire Framework               	       0x1187d7384 base::Thread::ThreadMain() + 444
8   zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
9   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
10  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 6:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cedc4 base::internal::WorkerThread::Delegate::WaitForWork() + 88
8   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
9   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
10  zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
11  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
12  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
13  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 7:: ThreadPoolPresentationWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 8:: ThreadPoolAudioWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 9:: ThreadPoolBackgroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf69c base::internal::WorkerThread::RunBackgroundPooledWorker() + 16
9   zwire Framework               	       0x1187cf638 base::internal::WorkerThread::ThreadMain() + 168
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 10:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cedc4 base::internal::WorkerThread::Delegate::WaitForWork() + 88
8   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
9   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
10  zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
11  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
12  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
13  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 11:: Chrome_IOThread
0   libsystem_kernel.dylib        	       0x188aa5ba8 kevent64 + 8
1   zwire Framework               	       0x1188191b8 base::MessagePumpKqueue::DoInternalWork(base::MessagePump::Delegate*, base::MessagePump::Delegate::NextWorkInfo*) + 176
2   zwire Framework               	       0x1188190c4 base::MessagePumpKqueue::Run(base::MessagePump::Delegate*) + 232
3   zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
4   zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
5   zwire Framework               	       0x1187d71b8 base::Thread::Run(base::RunLoop*) + 60
6   zwire Framework               	       0x115b52848 content::BrowserProcessIOThread::IOThreadRun(base::RunLoop*) + 88
7   zwire Framework               	       0x1187d7384 base::Thread::ThreadMain() + 444
8   zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
9   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
10  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 12:: MemoryInfra
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x11875a514 base::MessagePumpDefault::Run(base::MessagePump::Delegate*) + 536
7   zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
8   zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
9   zwire Framework               	       0x1187d71b8 base::Thread::Run(base::RunLoop*) + 60
10  zwire Framework               	       0x1187d7384 base::Thread::ThreadMain() + 444
11  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
12  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
13  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 13:: NetworkConfigWatcher
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   CoreFoundation                	       0x188b9b0d8 __CFRunLoopServiceMachPort + 160
5   CoreFoundation                	       0x188b999c4 __CFRunLoopRun + 1188
6   CoreFoundation                	       0x188c6c1c4 _CFRunLoopRunSpecificWithOptions + 532
7   Foundation                    	       0x18a3e3b44 -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 212
8   zwire Framework               	       0x118806d3c base::MessagePumpNSRunLoop::DoRun(base::MessagePump::Delegate*) + 108
9   zwire Framework               	       0x1188057e0 base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*) + 212
10  zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
11  zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
12  zwire Framework               	       0x1187d71b8 base::Thread::Run(base::RunLoop*) + 60
13  zwire Framework               	       0x1187d7384 base::Thread::ThreadMain() + 444
14  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
15  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
16  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 14:: CrShutdownDetector
0   libsystem_kernel.dylib        	       0x188a9a91c read + 8
1   zwire Framework               	       0x11873da84 (anonymous namespace)::ShutdownDetector::ThreadMain() + 172
2   zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
3   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
4   libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 15:: NetworkConfigWatcher
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   CoreFoundation                	       0x188b9b0d8 __CFRunLoopServiceMachPort + 160
5   CoreFoundation                	       0x188b999c4 __CFRunLoopRun + 1188
6   CoreFoundation                	       0x188c6c1c4 _CFRunLoopRunSpecificWithOptions + 532
7   Foundation                    	       0x18a3e3b44 -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 212
8   zwire Framework               	       0x118806d3c base::MessagePumpNSRunLoop::DoRun(base::MessagePump::Delegate*) + 108
9   zwire Framework               	       0x1188057e0 base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*) + 212
10  zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
11  zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
12  zwire Framework               	       0x1187d71b8 base::Thread::Run(base::RunLoop*) + 60
13  zwire Framework               	       0x1187d7384 base::Thread::ThreadMain() + 444
14  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
15  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
16  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 16:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cedc4 base::internal::WorkerThread::Delegate::WaitForWork() + 88
8   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
9   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
10  zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
11  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
12  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
13  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 17:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cedc4 base::internal::WorkerThread::Delegate::WaitForWork() + 88
8   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
9   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
10  zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
11  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
12  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
13  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 18:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 19:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 20:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 21:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 22:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 23:: NetworkNotificationThreadMac
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   CoreFoundation                	       0x188b9b0d8 __CFRunLoopServiceMachPort + 160
5   CoreFoundation                	       0x188b999c4 __CFRunLoopRun + 1188
6   CoreFoundation                	       0x188c6c1c4 _CFRunLoopRunSpecificWithOptions + 532
7   Foundation                    	       0x18a3e3b44 -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 212
8   zwire Framework               	       0x118806d3c base::MessagePumpNSRunLoop::DoRun(base::MessagePump::Delegate*) + 108
9   zwire Framework               	       0x1188057e0 base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*) + 212
10  zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
11  zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
12  zwire Framework               	       0x1187d71b8 base::Thread::Run(base::RunLoop*) + 60
13  zwire Framework               	       0x1187d7384 base::Thread::ThreadMain() + 444
14  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
15  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
16  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 24:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 25:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 26:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 27:: ThreadPoolSingleThreadForegroundBlocking
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cedc4 base::internal::WorkerThread::Delegate::WaitForWork() + 88
8   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
9   zwire Framework               	       0x1187cf778 base::internal::WorkerThread::RunDedicatedWorker() + 16
10  zwire Framework               	       0x1187cf650 base::internal::WorkerThread::ThreadMain() + 192
11  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
12  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
13  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 28:: CompositorTileWorker1
0   libsystem_kernel.dylib        	       0x188a9d50c __psynch_cvwait + 8
1   libsystem_pthread.dylib       	       0x188ade128 _pthread_cond_wait + 980
2   zwire Framework               	       0x1187eddcc base::ConditionVariable::Wait(base::Location const&) + 76
3   zwire Framework               	       0x119e8380c cc::SingleThreadTaskGraphRunner::Run() + 120
4   zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
5   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
6   libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 29:: ThreadPoolSingleThreadSharedBackgroundBlocking
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf6c8 base::internal::WorkerThread::RunBackgroundSharedWorker() + 16
9   zwire Framework               	       0x1187cf65c base::internal::WorkerThread::ThreadMain() + 204
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 30:: NetworkConfigWatcher
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   CoreFoundation                	       0x188b9b0d8 __CFRunLoopServiceMachPort + 160
5   CoreFoundation                	       0x188b999c4 __CFRunLoopRun + 1188
6   CoreFoundation                	       0x188c6c1c4 _CFRunLoopRunSpecificWithOptions + 532
7   Foundation                    	       0x18a3e3b44 -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 212
8   zwire Framework               	       0x118806d3c base::MessagePumpNSRunLoop::DoRun(base::MessagePump::Delegate*) + 108
9   zwire Framework               	       0x1188057e0 base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*) + 212
10  zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
11  zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
12  zwire Framework               	       0x1187d71b8 base::Thread::Run(base::RunLoop*) + 60
13  zwire Framework               	       0x1187d7384 base::Thread::ThreadMain() + 444
14  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
15  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
16  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 31:: ThreadPoolSingleThreadForegroundBlocking
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cedc4 base::internal::WorkerThread::Delegate::WaitForWork() + 88
8   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
9   zwire Framework               	       0x1187cf778 base::internal::WorkerThread::RunDedicatedWorker() + 16
10  zwire Framework               	       0x1187cf650 base::internal::WorkerThread::ThreadMain() + 192
11  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
12  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
13  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 32:: ThreadPoolSingleThreadSharedForegroundBlocking
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf74c base::internal::WorkerThread::RunSharedWorker() + 16
9   zwire Framework               	       0x1187cf644 base::internal::WorkerThread::ThreadMain() + 180
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 33:: NetworkConfigWatcher
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   CoreFoundation                	       0x188b9b0d8 __CFRunLoopServiceMachPort + 160
5   CoreFoundation                	       0x188b999c4 __CFRunLoopRun + 1188
6   CoreFoundation                	       0x188c6c1c4 _CFRunLoopRunSpecificWithOptions + 532
7   Foundation                    	       0x18a3e3b44 -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 212
8   zwire Framework               	       0x118806d3c base::MessagePumpNSRunLoop::DoRun(base::MessagePump::Delegate*) + 108
9   zwire Framework               	       0x1188057e0 base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*) + 212
10  zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
11  zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
12  zwire Framework               	       0x1187d71b8 base::Thread::Run(base::RunLoop*) + 60
13  zwire Framework               	       0x1187d7384 base::Thread::ThreadMain() + 444
14  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
15  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
16  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 34:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 35:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 36:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 37:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf720 base::internal::WorkerThread::RunPooledWorker() + 16
9   zwire Framework               	       0x1187cf608 base::internal::WorkerThread::ThreadMain() + 120
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 38:: CacheThread_BlockFile
0   libsystem_kernel.dylib        	       0x188aa5ba8 kevent64 + 8
1   zwire Framework               	       0x1188191b8 base::MessagePumpKqueue::DoInternalWork(base::MessagePump::Delegate*, base::MessagePump::Delegate::NextWorkInfo*) + 176
2   zwire Framework               	       0x1188190c4 base::MessagePumpKqueue::Run(base::MessagePump::Delegate*) + 232
3   zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
4   zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
5   zwire Framework               	       0x1187d71b8 base::Thread::Run(base::RunLoop*) + 60
6   zwire Framework               	       0x1187d7384 base::Thread::ThreadMain() + 444
7   zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
8   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
9   libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 39:: ThreadPoolSingleThreadSharedForeground
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cedc4 base::internal::WorkerThread::Delegate::WaitForWork() + 88
8   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
9   zwire Framework               	       0x1187cf74c base::internal::WorkerThread::RunSharedWorker() + 16
10  zwire Framework               	       0x1187cf644 base::internal::WorkerThread::ThreadMain() + 180
11  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
12  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
13  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 40:: VSyncThread
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   CoreFoundation                	       0x188b9b0d8 __CFRunLoopServiceMachPort + 160
5   CoreFoundation                	       0x188b999c4 __CFRunLoopRun + 1188
6   CoreFoundation                	       0x188c6c1c4 _CFRunLoopRunSpecificWithOptions + 532
7   Foundation                    	       0x18a3e3b44 -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 212
8   zwire Framework               	       0x118806d3c base::MessagePumpNSRunLoop::DoRun(base::MessagePump::Delegate*) + 108
9   zwire Framework               	       0x1188057e0 base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*) + 212
10  zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
11  zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
12  zwire Framework               	       0x1187d71b8 base::Thread::Run(base::RunLoop*) + 60
13  zwire Framework               	       0x1187d7384 base::Thread::ThreadMain() + 444
14  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
15  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
16  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 41:: ThreadPoolBackgroundWorker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x1187ced5c base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta) + 68
7   zwire Framework               	       0x1187cf904 base::internal::WorkerThread::RunWorker() + 368
8   zwire Framework               	       0x1187cf69c base::internal::WorkerThread::RunBackgroundPooledWorker() + 16
9   zwire Framework               	       0x1187cf638 base::internal::WorkerThread::ThreadMain() + 168
10  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
11  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 42:: org.libusb.device-hotplug
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   CoreFoundation                	       0x188b9b0d8 __CFRunLoopServiceMachPort + 160
5   CoreFoundation                	       0x188b999c4 __CFRunLoopRun + 1188
6   CoreFoundation                	       0x188c6c1c4 _CFRunLoopRunSpecificWithOptions + 532
7   CoreFoundation                	       0x188c0faf4 CFRunLoopRun + 64
8   zwire Framework               	       0x11abf4f6c darwin_event_thread_main + 272
9   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
10  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 43:: UsbEventHandler
0   libsystem_kernel.dylib        	       0x188aa26f8 poll + 8
1   zwire Framework               	       0x11abf25f4 handle_events + 228
2   zwire Framework               	       0x11abf2368 libusb_handle_events_timeout_completed + 612
3   zwire Framework               	       0x11abf2764 libusb_handle_events + 36
4   zwire Framework               	       0x11abe45ac device::UsbContext::UsbEventHandler::Run() + 172
5   zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
6   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
7   libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 44:: caulk.messenger.shared:17
0   libsystem_kernel.dylib        	       0x188a99bb0 semaphore_wait_trap + 8
1   caulk                         	       0x195427e00 caulk::semaphore::timed_wait(double) + 224
2   caulk                         	       0x195427cac caulk::concurrent::details::worker_thread::run() + 32
3   caulk                         	       0x19542794c void* caulk::thread_proxy<std::__1::tuple<caulk::thread::attributes, void (caulk::concurrent::details::worker_thread::*)(), std::__1::tuple<caulk::concurrent::details::worker_thread*>>>(void*) + 96
4   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
5   libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 45:: caulk.messenger.shared:high
0   libsystem_kernel.dylib        	       0x188a99bb0 semaphore_wait_trap + 8
1   caulk                         	       0x195427e00 caulk::semaphore::timed_wait(double) + 224
2   caulk                         	       0x195427cac caulk::concurrent::details::worker_thread::run() + 32
3   caulk                         	       0x19542794c void* caulk::thread_proxy<std::__1::tuple<caulk::thread::attributes, void (caulk::concurrent::details::worker_thread::*)(), std::__1::tuple<caulk::concurrent::details::worker_thread*>>>(void*) + 96
4   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
5   libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 46:: PowerSaveBlocker
0   libsystem_kernel.dylib        	       0x188a99c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x188aac574 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x188aa29c0 mach_msg_overwrite + 480
3   libsystem_kernel.dylib        	       0x188a99fc0 mach_msg + 24
4   zwire Framework               	       0x11880b928 base::WaitableEvent::TimedWaitImpl(base::TimeDelta) + 352
5   zwire Framework               	       0x11879da80 base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&) + 136
6   zwire Framework               	       0x11875a514 base::MessagePumpDefault::Run(base::MessagePump::Delegate*) + 536
7   zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
8   zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
9   zwire Framework               	       0x1187d71b8 base::Thread::Run(base::RunLoop*) + 60
10  zwire Framework               	       0x1187d7384 base::Thread::ThreadMain() + 444
11  zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
12  libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
13  libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 47:: Chrome_DevToolsADBThread
0   libsystem_kernel.dylib        	       0x188aa5ba8 kevent64 + 8
1   zwire Framework               	       0x1188191b8 base::MessagePumpKqueue::DoInternalWork(base::MessagePump::Delegate*, base::MessagePump::Delegate::NextWorkInfo*) + 176
2   zwire Framework               	       0x1188190c4 base::MessagePumpKqueue::Run(base::MessagePump::Delegate*) + 232
3   zwire Framework               	       0x1187b8804 base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta) + 316
4   zwire Framework               	       0x118783818 base::RunLoop::Run(base::Location const&) + 396
5   zwire Framework               	       0x1187d71b8 base::Thread::Run(base::RunLoop*) + 60
6   zwire Framework               	       0x1187d7384 base::Thread::ThreadMain() + 444
7   zwire Framework               	       0x1187ee62c base::(anonymous namespace)::ThreadFunc(void*) + 208
8   libsystem_pthread.dylib       	       0x188addc58 _pthread_start + 136
9   libsystem_pthread.dylib       	       0x188ad8c1c thread_start + 8

Thread 48:

Thread 49:

Thread 50:

Thread 51:


Thread 0 crashed with ARM Thread State (64-bit):
    x0: 0x000000016f8005b8   x1: 0x0000013407ad62d0   x2: 0x0000000000000000   x3: 0x0000013407ad62fd
    x4: 0x000001340b441d00   x5: 0x0000013400f8a982   x6: 0x0000000000000074   x7: 0x000000016f8000c0
    x8: 0x0000013403fd3eb0   x9: 0x0000013403fd3eb0  x10: 0x0000013000071598  x11: 0x0000000000000010
   x12: 0x0000000000003fff  x13: 0x0000000000000000  x14: 0x0000013400259900  x15: 0xffffffffffffffff
   x16: 0x0000000188ae7360  x17: 0x00000001f4c5de80  x18: 0x0000000000000000  x19: 0x0000013407ad62c0
   x20: 0x000000011f1839af  x21: 0x0000013407ccc6d8  x22: 0x0000013402624500  x23: 0x0000013401764380
   x24: 0x00000134014f8700  x25: 0xffffffffffffffff  x26: 0x0000013408114a40  x27: 0x0000013408114a58
   x28: 0x0000000000000002   fp: 0x000000016f8005d0   lr: 0x0000000116057fd0
    sp: 0x000000016f8005b0   pc: 0x0000000116057fd0 cpsr: 0x60000000
   far: 0x0000000000000000  esr: 0xf2000000 (Breakpoint) brk 0

Binary Images:
       0x1005fc000 -        0x1005fffff com.menketechnologies.zwire (150.0.7871.46) <4c4c446f-5555-3144-a178-702a5102c559> /Applications/zwire.app/Contents/Resources/browser/zwire.app/Contents/MacOS/zwire
       0x1130a0000 -        0x1202ebfff com.menketechnologies.zwire.framework (150.0.7871.46) <4c4c448f-5555-3144-a128-4d4b0230aef1> /Applications/zwire.app/Contents/Resources/browser/zwire.app/Contents/Frameworks/zwire Framework.framework/Versions/150.0.7871.46/zwire Framework
       0x10b360000 -        0x10b36bfff libobjc-trampolines.dylib (*) <ca58aa96-b997-3a6d-9132-19d49be4b3e9> /usr/lib/libobjc-trampolines.dylib
       0x10e81c000 -        0x10f1d7fff com.apple.AGXMetalG17X (351.2) <81e8aeac-3aa5-3303-a8d0-b18b74a6d94b> /System/Library/Extensions/AGXMetalG17X.bundle/Contents/MacOS/AGXMetalG17X
       0x10e7d8000 -        0x10e7f3fff com.apple.security.csparser (3.0) <3bcf8cf8-291e-348f-8aa5-7408851d3c05> /System/Library/Frameworks/Security.framework/Versions/A/PlugIns/csparser.bundle/Contents/MacOS/csparser
       0x188b1d000 -        0x18907b31f com.apple.CoreFoundation (6.9) <04e3598b-f226-3250-b3b2-ce938dd4db7e> /System/Library/Frameworks/CoreFoundation.framework/Versions/A/CoreFoundation
       0x1958c2000 -        0x195bbd11f com.apple.HIToolbox (2.1.1) <8716490e-acc2-3688-8c2f-5ca42b4c9da9> /System/Library/Frameworks/Carbon.framework/Versions/A/Frameworks/HIToolbox.framework/Versions/A/HIToolbox
       0x18cf8f000 -        0x18e6b1f9f com.apple.AppKit (6.9) <cf57a4fc-4be3-3d95-b543-d744e8718b26> /System/Library/Frameworks/AppKit.framework/Versions/C/AppKit
       0x188700000 -        0x1887a6217 dyld (*) <a237ef81-b68b-37ba-a165-92c965529534> /usr/lib/dyld
               0x0 - 0xffffffffffffffff ??? (*) <00000000-0000-0000-0000-000000000000> ???
       0x188ae4000 -        0x188aec963 libsystem_platform.dylib (*) <160fd864-8d15-36fc-9e97-9725388cfafe> /usr/lib/system/libsystem_platform.dylib
       0x188a99000 -        0x188ad62af libsystem_kernel.dylib (*) <cc1cf985-bc65-3725-809f-4c1e36b8f4ba> /usr/lib/system/libsystem_kernel.dylib
       0x188ad7000 -        0x188ae3b3b libsystem_pthread.dylib (*) <4f33683c-18c8-39a1-800b-2e3bd43bcc13> /usr/lib/system/libsystem_pthread.dylib
       0x18a38a000 -        0x18b36c41f com.apple.Foundation (6.9) <49dd529f-1708-3767-997b-1a4639a07536> /System/Library/Frameworks/Foundation.framework/Versions/C/Foundation
       0x1888d0000 -        0x1889201d7 libsystem_malloc.dylib (*) <5fae4807-4d2b-3a95-a63a-dd96d3da11b4> /usr/lib/system/libsystem_malloc.dylib
       0x195426000 -        0x19544f05f com.apple.audio.caulk (1.0) <47e71130-9608-3d99-aceb-df5638bc08df> /System/Library/PrivateFrameworks/caulk.framework/Versions/A/caulk

External Modification Summary:
  Calls made by other processes targeting this process:
    task_for_pid: 2075
    thread_create: 0
    thread_set_state: 0
  Calls made by this process:
    task_for_pid: 0
    thread_create: 0
    thread_set_state: 0
  Calls made by all processes on this machine:
    task_for_pid: 2491044
    thread_create: 0
    thread_set_state: 30

-----------
Full Report
-----------

{"app_name":"zwire","timestamp":"2026-07-08 18:09:47.00 -0400","app_version":"150.0.7871.46","slice_uuid":"4c4c446f-5555-3144-a178-702a5102c559","build_version":"7871.46","platform":1,"bundleID":"com.menketechnologies.zwire","share_with_app_devs":0,"is_first_party":0,"bug_type":"309","os_version":"macOS 26.5.1 (25F80)","roots_installed":0,"name":"zwire","incident_id":"A0971704-83A5-4BD3-AF83-8816D0E77FAA"}
{
  "uptime" : 140000,
  "procRole" : "Foreground",
  "version" : 2,
  "userID" : 501,
  "deployVersion" : 210,
  "modelCode" : "Mac17,6",
  "coalitionID" : 102525,
  "osVersion" : {
    "train" : "macOS 26.5.1",
    "build" : "25F80",
    "releaseType" : "User"
  },
  "captureTime" : "2026-07-08 18:09:21.9265 -0400",
  "codeSigningMonitor" : 2,
  "incident" : "A0971704-83A5-4BD3-AF83-8816D0E77FAA",
  "pid" : 2230,
  "translated" : false,
  "cpuType" : "ARM-64",
  "procLaunch" : "2026-07-08 17:17:06.3185 -0400",
  "procStartAbsTime" : 3379826839540,
  "procExitAbsTime" : 3455080182618,
  "procName" : "zwire",
  "procPath" : "\/Applications\/zwire.app\/Contents\/Resources\/browser\/zwire.app\/Contents\/MacOS\/zwire",
  "bundleInfo" : {"CFBundleShortVersionString":"150.0.7871.46","CFBundleVersion":"7871.46","CFBundleIdentifier":"com.menketechnologies.zwire"},
  "storeInfo" : {"deviceIdentifierForVendor":"51D089A9-D4DE-5DFA-90E3-860DFD73118E","thirdParty":true},
  "parentProc" : "launchd",
  "parentPid" : 1,
  "coalitionName" : "com.menketechnologies.zwire",
  "crashReporterKey" : "1B401E12-C26D-14C8-52DB-8E806980D459",
  "appleIntelligenceStatus" : {"state":"unavailable","reasons":["notOptedIn","assetIsNotReady"]},
  "developerMode" : 1,
  "codeSigningID" : "com.menketechnologies.zwire",
  "codeSigningTeamID" : "",
  "codeSigningFlags" : 570425889,
  "codeSigningValidationCategory" : 10,
  "codeSigningTrustLevel" : 4294967295,
  "codeSigningAuxiliaryInfo" : 0,
  "instructionByteStream" : {"beforePC":"8wMAqoCyULkn4P+X9AMAqqosQZXjAwCq4CMAkeEDE6riAxSq71uelA==","atPC":"AAAg1AAAQNQgACDUCFhJ+WgAALQAoUO5wANf1v8DAdH0TwKp\/XsDqQ=="},
  "bootSessionUUID" : "0D369EDD-451F-4A60-BC29-7CDC6E2BC399",
  "wakeTime" : 25504,
  "sleepWakeUUID" : "FCF7764E-2FC8-47E1-9DB2-B787603D34F4",
  "sip" : "enabled",
  "exception" : {"codes":"0x0000000000000001, 0x0000000116057fd0","rawCodes":[1,4664426448],"type":"EXC_BREAKPOINT","signal":"SIGTRAP"},
  "termination" : {"flags":0,"code":5,"namespace":"SIGNAL","indicator":"Trace\/BPT trap: 5","byProc":"exc handler","byPid":2230},
  "os_fault" : {"process":"zwire"},
  "extMods" : {"caller":{"thread_create":0,"thread_set_state":0,"task_for_pid":0},"system":{"thread_create":0,"thread_set_state":30,"task_for_pid":2491044},"targeted":{"thread_create":0,"thread_set_state":0,"task_for_pid":2075},"warnings":0},
  "faultingThread" : 0,
  "threads" : [{"threadState":{"x":[{"value":6165628344},{"value":1322978730704},{"value":0},{"value":1322978730749},{"value":1323038940416},{"value":1322866223490},{"value":116},{"value":6165627072},{"value":1322916855472},{"value":1322916855472},{"value":1305670522264},{"value":16},{"value":16383},{"value":0},{"value":1322852391168},{"value":18446744073709551615},{"value":6588101472,"symbolLocation":0,"symbol":"_platform_memmove"},{"value":8401575552,"symbolLocation":0,"symbol":"_main_thread"},{"value":0},{"value":1322978730688},{"value":4816648623,"symbolLocation":228897,"symbol":"optimization_guide::(anonymous namespace)::kUninstallingVersion"},{"value":1322980787928},{"value":1322889921792},{"value":1322874454912},{"value":1322871916288},{"value":18446744073709551615},{"value":1322985278016},{"value":1322985278040},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4664426448},"cpsr":{"value":1610612736},"fp":{"value":6165628368},"sp":{"value":6165628336},"esr":{"value":4060086272,"description":"(Breakpoint) brk 0"},"pc":{"value":4664426448,"matchesCrashFrame":1},"far":{"value":0}},"id":36299392,"triggered":true,"name":"CrBrowserMain","queue":"com.apple.main-thread","frames":[{"imageOffset":50036688,"symbol":"content::RenderFrameHostImpl::IsSandboxed(network::mojom::WebSandboxFlags)","symbolLocation":92,"imageIndex":1},{"imageOffset":56452636,"symbol":"extensions::ExtensionFunctionDispatcher::DispatchWithCallbackInternal(mojo::StructPtr<extensions::mojom::RequestParams>, content::RenderFrameHost*, content::RenderProcessHost&, base::OnceCallback<void (ExtensionFunction::ResponseType, base::ListValue, std::__Cr::basic_string<char, std::__Cr::char_traits<char>, std::__Cr::allocator<char>> const&, mojo::StructPtr<extensions::mojom::ExtraResponseData>)>)","symbolLocation":1588,"imageIndex":1},{"imageOffset":56450224,"symbol":"extensions::ExtensionFunctionDispatcher::Dispatch(mojo::StructPtr<extensions::mojom::RequestParams>, content::RenderFrameHost&, base::OnceCallback<void (bool, base::ListValue, std::__Cr::basic_string<char, std::__Cr::char_traits<char>, std::__Cr::allocator<char>> const&, mojo::StructPtr<extensions::mojom::ExtraResponseData>)>)","symbolLocation":396,"imageIndex":1},{"imageOffset":56424076,"symbol":"extensions::ExtensionFrameHost::Request(mojo::StructPtr<extensions::mojom::RequestParams>, base::OnceCallback<void (bool, base::ListValue, std::__Cr::basic_string<char, std::__Cr::char_traits<char>, std::__Cr::allocator<char>> const&, mojo::StructPtr<extensions::mojom::ExtraResponseData>)>)","symbolLocation":84,"imageIndex":1},{"imageOffset":57212884,"symbol":"extensions::mojom::LocalFrameHostStubDispatch::AcceptWithResponder(extensions::mojom::LocalFrameHost*, mojo::Message*, std::__Cr::unique_ptr<mojo::MessageReceiverWithStatus, std::__Cr::default_delete<mojo::MessageReceiverWithStatus>>)","symbolLocation":644,"imageIndex":1},{"imageOffset":93735432,"symbol":"mojo::InterfaceEndpointClient::HandleValidatedMessage(mojo::Message*)","symbolLocation":800,"imageIndex":1},{"imageOffset":93754328,"symbol":"mojo::MessageDispatcher::Accept(mojo::Message*)","symbolLocation":168,"imageIndex":1},{"imageOffset":93740520,"symbol":"mojo::InterfaceEndpointClient::HandleIncomingMessage(mojo::Message*)","symbolLocation":72,"imageIndex":1},{"imageOffset":108470488,"symbol":"IPC::ChannelAssociatedGroupController::AcceptOnEndpointThread(mojo::Message, IPC::(anonymous namespace)::ScopedUrgentMessageNotification)","symbolLocation":268,"imageIndex":1},{"imageOffset":108472028,"symbol":"base::internal::Invoker<base::internal::FunctorTraits<void (IPC::ChannelAssociatedGroupController::*&&)(mojo::Message, IPC::(anonymous namespace)::ScopedUrgentMessageNotification), IPC::ChannelAssociatedGroupController*&&, mojo::Message&&, IPC::(anonymous namespace)::ScopedUrgentMessageNotification&&>, base::internal::BindState<true, true, false, void (IPC::ChannelAssociatedGroupController::*)(mojo::Message, IPC::(anonymous namespace)::ScopedUrgentMessageNotification), scoped_refptr<IPC::ChannelAssociatedGroupController>, mojo::Message, IPC::(anonymous namespace)::ScopedUrgentMessageNotification>, void ()>::RunOnce(base::internal::BindStateBase*)","symbolLocation":88,"imageIndex":1},{"imageOffset":91226656,"symbol":"base::TaskAnnotator::RunTaskImpl(base::PendingTask&)","symbolLocation":352,"imageIndex":1},{"imageOffset":91324900,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::DoWorkImpl(base::LazyNow*)","symbolLocation":764,"imageIndex":1},{"imageOffset":91323860,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::DoWork()","symbolLocation":92,"imageIndex":1},{"imageOffset":91645956,"symbol":"base::MessagePumpCFRunLoopBase::RunWork()","symbolLocation":152,"imageIndex":1},{"imageOffset":91627480,"symbol":"base::apple::CallWithEHFrame(void () block_pointer)","symbolLocation":16,"imageIndex":1},{"imageOffset":91643420,"symbol":"base::MessagePumpCFRunLoopBase::RunDelayedWorkTimer(__CFRunLoopTimer*, void*)","symbolLocation":60,"imageIndex":1},{"imageOffset":619288,"symbol":"__CFRUNLOOP_IS_CALLING_OUT_TO_A_TIMER_CALLBACK_FUNCTION__","symbolLocation":32,"imageIndex":5},{"imageOffset":618512,"symbol":"__CFRunLoopDoTimer","symbolLocation":980,"imageIndex":5},{"imageOffset":617352,"symbol":"__CFRunLoopDoTimers","symbolLocation":280,"imageIndex":5},{"imageOffset":511032,"symbol":"__CFRunLoopRun","symbolLocation":1816,"imageIndex":5},{"imageOffset":1372612,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":532,"imageIndex":5},{"imageOffset":775520,"symbol":"RunCurrentEventLoopInMode","symbolLocation":320,"imageIndex":6},{"imageOffset":788668,"symbol":"ReceiveNextEventCommon","symbolLocation":488,"imageIndex":6},{"imageOffset":2400588,"symbol":"_BlockUntilNextEventMatchingListInMode","symbolLocation":48,"imageIndex":6},{"imageOffset":7230300,"symbol":"_DPSBlockUntilNextEventMatchingListInMode","symbolLocation":228,"imageIndex":7},{"imageOffset":233604,"symbol":"_DPSNextEvent","symbolLocation":576,"imageIndex":7},{"imageOffset":12380336,"symbol":"-[NSApplication(NSEventRouting) _nextEventMatchingEventMask:untilDate:inMode:dequeue:]","symbolLocation":688,"imageIndex":7},{"imageOffset":12379580,"symbol":"-[NSApplication(NSEventRouting) nextEventMatchingMask:untilDate:inMode:dequeue:]","symbolLocation":72,"imageIndex":7},{"imageOffset":122561044,"symbol":"__64-[CrApplication nextEventMatchingMask:untilDate:inMode:dequeue:]_block_invoke","symbolLocation":64,"imageIndex":1},{"imageOffset":91627480,"symbol":"base::apple::CallWithEHFrame(void () block_pointer)","symbolLocation":16,"imageIndex":1},{"imageOffset":122560860,"symbol":"-[CrApplication nextEventMatchingMask:untilDate:inMode:dequeue:]","symbolLocation":176,"imageIndex":1},{"imageOffset":180540,"symbol":"-[NSApplication run]","symbolLocation":368,"imageIndex":7},{"imageOffset":91647868,"symbol":"base::MessagePumpNSApplication::DoRun(base::MessagePump::Delegate*)","symbolLocation":284,"imageIndex":1},{"imageOffset":91641824,"symbol":"base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*)","symbolLocation":212,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":44762596,"symbol":"content::BrowserMainLoop::RunMainMessageLoop()","symbolLocation":184,"imageIndex":1},{"imageOffset":44768472,"symbol":"content::BrowserMainRunnerImpl::Run()","symbolLocation":24,"imageIndex":1},{"imageOffset":44753696,"symbol":"content::BrowserMain(content::MainFunctionParams)","symbolLocation":132,"imageIndex":1},{"imageOffset":77306588,"symbol":"content::RunBrowserProcessMain(content::MainFunctionParams, content::ContentMainDelegate*)","symbolLocation":164,"imageIndex":1},{"imageOffset":77311544,"symbol":"content::ContentMainRunnerImpl::RunBrowser(content::MainFunctionParams, bool)","symbolLocation":1176,"imageIndex":1},{"imageOffset":77310288,"symbol":"content::ContentMainRunnerImpl::Run()","symbolLocation":596,"imageIndex":1},{"imageOffset":77304704,"symbol":"content::RunContentProcess(content::ContentMainParams, content::ContentMainRunner*)","symbolLocation":1308,"imageIndex":1},{"imageOffset":77305068,"symbol":"content::ContentMain(content::ContentMainParams)","symbolLocation":100,"imageIndex":1},{"imageOffset":19764,"symbol":"ChromeMain","symbolLocation":436,"imageIndex":1},{"imageOffset":2232,"symbol":"main","symbolLocation":288,"imageIndex":0},{"imageOffset":130560,"symbol":"start","symbolLocation":6992,"imageIndex":8}]},{"id":36299422,"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":182833420,"symbol":"crashpad::MachMessageWithDeadline(mach_msg_header_t*, int, unsigned int, unsigned int, unsigned long long, unsigned int, bool)","symbolLocation":448,"imageIndex":1},{"imageOffset":182838780,"symbol":"crashpad::(anonymous namespace)::MachMessageAllocateReceive(crashpad::(anonymous namespace)::MachMessageBuffer*, int, unsigned int, unsigned int, unsigned long long, unsigned int, bool)","symbolLocation":200,"imageIndex":1},{"imageOffset":182837920,"symbol":"crashpad::MachMessageServer::Run(crashpad::MachMessageServer::Interface*, unsigned int, int, crashpad::MachMessageServer::Persistent, crashpad::MachMessageServer::ReceiveLarge, unsigned int)","symbolLocation":288,"imageIndex":1},{"imageOffset":182850012,"symbol":"crashpad::(anonymous namespace)::HandlerStarter::RestartThreadMain(void*)","symbolLocation":68,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}],"threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":0},{"value":0},{"value":65983582568448},{"value":48},{"value":0},{"value":0},{"value":17179869184},{"value":48},{"value":0},{"value":0},{"value":0},{"value":15363},{"value":0},{"value":18446744073709551569},{"value":8424894608},{"value":0},{"value":0},{"value":48},{"value":65983582568448},{"value":0},{"value":0},{"value":17179870210},{"value":4301799424},{"value":0},{"value":18446744073709550527},{"value":1026}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6175763056},"sp":{"value":6175762976},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}}},{"id":36299438,"name":"com.apple.NSEventThread","threadState":{"x":[{"value":0},{"value":21592279046},{"value":8589934592},{"value":125357210468352},{"value":0},{"value":125357210468352},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":29187},{"value":0},{"value":18446744073709551569},{"value":8424896272},{"value":0},{"value":4294967295},{"value":2},{"value":125357210468352},{"value":0},{"value":125357210468352},{"value":21592279046},{"value":6178054280},{"value":8589934592},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6178054128},"sp":{"value":6178054048},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":516312,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":160,"imageIndex":5},{"imageOffset":510404,"symbol":"__CFRunLoopRun","symbolLocation":1188,"imageIndex":5},{"imageOffset":1372612,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":532,"imageIndex":5},{"imageOffset":1420412,"symbol":"_NSEventThread","symbolLocation":184,"imageIndex":7},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299571,"name":"HangWatcher","threadState":{"x":[{"value":268451845},{"value":17179869442},{"value":0},{"value":189163244617728},{"value":0},{"value":189163244617728},{"value":32},{"value":10000},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":44043},{"value":7},{"value":18446744073709551569},{"value":1305670981632},{"value":0},{"value":10000},{"value":32},{"value":189163244617728},{"value":0},{"value":189163244617728},{"value":17179870466},{"value":6186478992},{"value":0},{"value":18446744073709550527},{"value":1282}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6186478336},"sp":{"value":6186478256},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91426324,"symbol":"base::HangWatcher::Wait()","symbolLocation":156,"imageIndex":1},{"imageOffset":91426652,"symbol":"base::HangWatcher::Run()","symbolLocation":72,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299572,"name":"PerfettoTrace","threadState":{"x":[{"value":4},{"value":0},{"value":0},{"value":1305691769696},{"value":1},{"value":0},{"value":0},{"value":1322850815104},{"value":0},{"value":0},{"value":0},{"value":1},{"value":0},{"value":0},{"value":104},{"value":7},{"value":369},{"value":6194900992},{"value":0},{"value":1305690412064},{"value":1305670801536},{"value":0},{"value":12297829382473034411},{"value":4846438336,"symbolLocation":0,"symbol":"partition_alloc::internal::PartitionAddressSpace::setup_"},{"value":1},{"value":1305690412456},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4706111928},"cpsr":{"value":2684354560},"fp":{"value":6194900352},"sp":{"value":6194900304},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587833256},"far":{"value":0}},"frames":[{"imageOffset":52136,"symbol":"kevent64","symbolLocation":8,"imageIndex":11},{"imageOffset":91722168,"symbol":"base::MessagePumpKqueue::DoInternalWork(base::MessagePump::Delegate*, base::MessagePump::Delegate::NextWorkInfo*)","symbolLocation":176,"imageIndex":1},{"imageOffset":91721924,"symbol":"base::MessagePumpKqueue::Run(base::MessagePump::Delegate*)","symbolLocation":232,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":91451832,"symbol":"base::Thread::Run(base::RunLoop*)","symbolLocation":60,"imageIndex":1},{"imageOffset":91452292,"symbol":"base::Thread::ThreadMain()","symbolLocation":444,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299573,"name":"ThreadPoolServiceThread","threadState":{"x":[{"value":1},{"value":0},{"value":0},{"value":1322926865376},{"value":5},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":623},{"value":143960331250},{"value":0},{"value":0},{"value":96},{"value":7},{"value":369},{"value":6203322368},{"value":0},{"value":1305690413600},{"value":1305670802688},{"value":0},{"value":12297829382473034411},{"value":4846438336,"symbolLocation":0,"symbol":"partition_alloc::internal::PartitionAddressSpace::setup_"},{"value":1},{"value":1305690413992},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4706111928},"cpsr":{"value":2147483648},"fp":{"value":6203321696},"sp":{"value":6203321648},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587833256},"far":{"value":0}},"frames":[{"imageOffset":52136,"symbol":"kevent64","symbolLocation":8,"imageIndex":11},{"imageOffset":91722168,"symbol":"base::MessagePumpKqueue::DoInternalWork(base::MessagePump::Delegate*, base::MessagePump::Delegate::NextWorkInfo*)","symbolLocation":176,"imageIndex":1},{"imageOffset":91721924,"symbol":"base::MessagePumpKqueue::Run(base::MessagePump::Delegate*)","symbolLocation":232,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":91451832,"symbol":"base::Thread::Run(base::RunLoop*)","symbolLocation":60,"imageIndex":1},{"imageOffset":91371556,"symbol":"base::internal::ServiceThread::Run(base::RunLoop*)","symbolLocation":16,"imageIndex":1},{"imageOffset":91452292,"symbol":"base::Thread::ThreadMain()","symbolLocation":444,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299574,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869442},{"value":0},{"value":275990303473664},{"value":0},{"value":275990303473664},{"value":32},{"value":1539},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":64259},{"value":7},{"value":18446744073709551569},{"value":1305670992384},{"value":0},{"value":1539},{"value":32},{"value":275990303473664},{"value":0},{"value":275990303473664},{"value":17179870466},{"value":6211742896},{"value":0},{"value":18446744073709550527},{"value":1282}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6211742240},"sp":{"value":6211742160},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91418052,"symbol":"base::internal::WorkerThread::Delegate::WaitForWork()","symbolLocation":88,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299575,"name":"ThreadPoolPresentationWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":197924977901568},{"value":0},{"value":197924977901568},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":46083},{"value":8401708792,"symbolLocation":0,"symbol":"__CFConstantStringClassReference"},{"value":18446744073709551569},{"value":1305670990848},{"value":0},{"value":0},{"value":32},{"value":197924977901568},{"value":0},{"value":197924977901568},{"value":17179869186},{"value":6220164320},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6220163664},"sp":{"value":6220163584},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299576,"name":"ThreadPoolAudioWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":200124001157120},{"value":0},{"value":200124001157120},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":46595},{"value":2199023256064},{"value":18446744073709551569},{"value":1305670993920},{"value":0},{"value":0},{"value":32},{"value":200124001157120},{"value":0},{"value":200124001157120},{"value":17179869186},{"value":6228585696},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6228585040},"sp":{"value":6228584960},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299577,"name":"ThreadPoolBackgroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":201223512784896},{"value":0},{"value":201223512784896},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":46851},{"value":1774272},{"value":18446744073709551569},{"value":4706384484,"symbolLocation":0,"symbol":"allocator_shim::(anonymous namespace)::MallocZoneTryFreeDefault(_malloc_zone_t*, void*)"},{"value":0},{"value":0},{"value":32},{"value":201223512784896},{"value":0},{"value":201223512784896},{"value":17179869186},{"value":6237007072},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6237006416},"sp":{"value":6237006336},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420316,"symbol":"base::internal::WorkerThread::RunBackgroundPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420216,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":168,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299578,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869442},{"value":0},{"value":202323024412672},{"value":0},{"value":202323024412672},{"value":32},{"value":1794},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":47107},{"value":7},{"value":18446744073709551569},{"value":1305670996992},{"value":0},{"value":1794},{"value":32},{"value":202323024412672},{"value":0},{"value":202323024412672},{"value":17179870466},{"value":6245428400},{"value":0},{"value":18446744073709550527},{"value":1282}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6245427744},"sp":{"value":6245427664},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91418052,"symbol":"base::internal::WorkerThread::Delegate::WaitForWork()","symbolLocation":88,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299579,"name":"Chrome_IOThread","threadState":{"x":[{"value":1},{"value":0},{"value":0},{"value":1322923076352},{"value":59},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":4818247655,"symbolLocation":28896,"symbol":"extensions::(anonymous namespace)::kErrorTooManyListeners"},{"value":143961462750},{"value":0},{"value":0},{"value":96},{"value":7},{"value":369},{"value":1305670998528},{"value":0},{"value":1305690411296},{"value":1305670804992},{"value":0},{"value":12297829382473034411},{"value":4846438336,"symbolLocation":0,"symbol":"partition_alloc::internal::PartitionAddressSpace::setup_"},{"value":1},{"value":1305690411688},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4706111928},"cpsr":{"value":2147483648},"fp":{"value":6253849936},"sp":{"value":6253849888},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587833256},"far":{"value":0}},"frames":[{"imageOffset":52136,"symbol":"kevent64","symbolLocation":8,"imageIndex":11},{"imageOffset":91722168,"symbol":"base::MessagePumpKqueue::DoInternalWork(base::MessagePump::Delegate*, base::MessagePump::Delegate::NextWorkInfo*)","symbolLocation":176,"imageIndex":1},{"imageOffset":91721924,"symbol":"base::MessagePumpKqueue::Run(base::MessagePump::Delegate*)","symbolLocation":232,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":91451832,"symbol":"base::Thread::Run(base::RunLoop*)","symbolLocation":60,"imageIndex":1},{"imageOffset":44771400,"symbol":"content::BrowserProcessIOThread::IOThreadRun(base::RunLoop*)","symbolLocation":88,"imageIndex":1},{"imageOffset":91452292,"symbol":"base::Thread::ThreadMain()","symbolLocation":444,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299580,"name":"MemoryInfra","threadState":{"x":[{"value":268451843},{"value":17179869442},{"value":0},{"value":257298605801472},{"value":0},{"value":257298605801472},{"value":32},{"value":41},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":59907},{"value":7},{"value":18446744073709551569},{"value":6262272000},{"value":0},{"value":41},{"value":32},{"value":257298605801472},{"value":0},{"value":257298605801472},{"value":17179870466},{"value":6262270928},{"value":0},{"value":18446744073709550527},{"value":1282}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6262270272},"sp":{"value":6262270192},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":90940692,"symbol":"base::MessagePumpDefault::Run(base::MessagePump::Delegate*)","symbolLocation":536,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":91451832,"symbol":"base::Thread::Run(base::RunLoop*)","symbolLocation":60,"imageIndex":1},{"imageOffset":91452292,"symbol":"base::Thread::ThreadMain()","symbolLocation":444,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299581,"name":"NetworkConfigWatcher","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":251801047662592},{"value":0},{"value":251801047662592},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":58627},{"value":0},{"value":18446744073709551569},{"value":8424896272},{"value":0},{"value":4294967295},{"value":2},{"value":251801047662592},{"value":0},{"value":251801047662592},{"value":21592279046},{"value":6270688760},{"value":8589934592},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6270688608},"sp":{"value":6270688528},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":516312,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":160,"imageIndex":5},{"imageOffset":510404,"symbol":"__CFRunLoopRun","symbolLocation":1188,"imageIndex":5},{"imageOffset":1372612,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":532,"imageIndex":5},{"imageOffset":367428,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":212,"imageIndex":13},{"imageOffset":91647292,"symbol":"base::MessagePumpNSRunLoop::DoRun(base::MessagePump::Delegate*)","symbolLocation":108,"imageIndex":1},{"imageOffset":91641824,"symbol":"base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*)","symbolLocation":212,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":91451832,"symbol":"base::Thread::Run(base::RunLoop*)","symbolLocation":60,"imageIndex":1},{"imageOffset":91452292,"symbol":"base::Thread::ThreadMain()","symbolLocation":444,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299582,"name":"CrShutdownDetector","threadState":{"x":[{"value":4},{"value":0},{"value":4},{"value":6279114851},{"value":6279114184},{"value":18},{"value":0},{"value":0},{"value":18},{"value":8401624664,"symbolLocation":0,"symbol":"_current_pid"},{"value":8386658481683590775},{"value":8026668483491361347},{"value":100425719},{"value":1322851308704},{"value":0},{"value":7},{"value":3},{"value":8424903040},{"value":0},{"value":1322850726464},{"value":0},{"value":6279114572},{"value":4},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4705213060},"cpsr":{"value":1610612736},"fp":{"value":6279114624},"sp":{"value":6279114256},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587787548},"far":{"value":0}},"frames":[{"imageOffset":6428,"symbol":"read","symbolLocation":8,"imageIndex":11},{"imageOffset":90823300,"symbol":"(anonymous namespace)::ShutdownDetector::ThreadMain()","symbolLocation":172,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299667,"name":"NetworkConfigWatcher","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":217716187201536},{"value":0},{"value":217716187201536},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":50691},{"value":0},{"value":18446744073709551569},{"value":8424896272},{"value":0},{"value":4294967295},{"value":2},{"value":217716187201536},{"value":0},{"value":217716187201536},{"value":21592279046},{"value":6287531512},{"value":8589934592},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6287531360},"sp":{"value":6287531280},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":516312,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":160,"imageIndex":5},{"imageOffset":510404,"symbol":"__CFRunLoopRun","symbolLocation":1188,"imageIndex":5},{"imageOffset":1372612,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":532,"imageIndex":5},{"imageOffset":367428,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":212,"imageIndex":13},{"imageOffset":91647292,"symbol":"base::MessagePumpNSRunLoop::DoRun(base::MessagePump::Delegate*)","symbolLocation":108,"imageIndex":1},{"imageOffset":91641824,"symbol":"base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*)","symbolLocation":212,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":91451832,"symbol":"base::Thread::Run(base::RunLoop*)","symbolLocation":60,"imageIndex":1},{"imageOffset":91452292,"symbol":"base::Thread::ThreadMain()","symbolLocation":444,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299668,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869442},{"value":0},{"value":221014722084864},{"value":0},{"value":221014722084864},{"value":32},{"value":1990},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":51459},{"value":8},{"value":18446744073709551569},{"value":1322856421376},{"value":0},{"value":1990},{"value":32},{"value":221014722084864},{"value":0},{"value":221014722084864},{"value":17179870466},{"value":6295956656},{"value":0},{"value":18446744073709550527},{"value":1282}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6295956000},"sp":{"value":6295955920},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91418052,"symbol":"base::internal::WorkerThread::Delegate::WaitForWork()","symbolLocation":88,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299669,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869442},{"value":0},{"value":245203977895936},{"value":0},{"value":245203977895936},{"value":32},{"value":1002},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":57091},{"value":7},{"value":18446744073709551569},{"value":1322856425984},{"value":0},{"value":1002},{"value":32},{"value":245203977895936},{"value":0},{"value":245203977895936},{"value":17179870466},{"value":6304378032},{"value":0},{"value":18446744073709550527},{"value":1282}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6304377376},"sp":{"value":6304377296},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91418052,"symbol":"base::internal::WorkerThread::Delegate::WaitForWork()","symbolLocation":88,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299670,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":244104466268160},{"value":0},{"value":244104466268160},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":56835},{"value":412416},{"value":18446744073709551569},{"value":1322856422912},{"value":0},{"value":0},{"value":32},{"value":244104466268160},{"value":0},{"value":244104466268160},{"value":17179869186},{"value":6312799456},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6312798800},"sp":{"value":6312798720},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299671,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":243004954640384},{"value":0},{"value":243004954640384},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":56579},{"value":1854720},{"value":18446744073709551569},{"value":8424894640},{"value":0},{"value":0},{"value":32},{"value":243004954640384},{"value":0},{"value":243004954640384},{"value":17179869186},{"value":6321220832},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6321220176},"sp":{"value":6321220096},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299672,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":225412768595968},{"value":0},{"value":225412768595968},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":52483},{"value":1852480},{"value":18446744073709551569},{"value":1322856429056},{"value":0},{"value":0},{"value":32},{"value":225412768595968},{"value":0},{"value":225412768595968},{"value":17179869186},{"value":6329642208},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6329641552},"sp":{"value":6329641472},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299673,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":239706419757056},{"value":0},{"value":239706419757056},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":55811},{"value":1276384},{"value":18446744073709551569},{"value":1322856430592},{"value":0},{"value":0},{"value":32},{"value":239706419757056},{"value":0},{"value":239706419757056},{"value":17179869186},{"value":6338063584},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6338062928},"sp":{"value":6338062848},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299674,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":240805931384832},{"value":0},{"value":240805931384832},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":56067},{"value":152576},{"value":18446744073709551569},{"value":1322856427520},{"value":0},{"value":0},{"value":32},{"value":240805931384832},{"value":0},{"value":240805931384832},{"value":17179869186},{"value":6346484960},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6346484304},"sp":{"value":6346484224},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299675,"name":"NetworkNotificationThreadMac","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":288084931379200},{"value":0},{"value":288084931379200},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":67075},{"value":0},{"value":18446744073709551569},{"value":8424896272},{"value":0},{"value":4294967295},{"value":2},{"value":288084931379200},{"value":0},{"value":288084931379200},{"value":21592279046},{"value":6354902520},{"value":8589934592},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6354902368},"sp":{"value":6354902288},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":516312,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":160,"imageIndex":5},{"imageOffset":510404,"symbol":"__CFRunLoopRun","symbolLocation":1188,"imageIndex":5},{"imageOffset":1372612,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":532,"imageIndex":5},{"imageOffset":367428,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":212,"imageIndex":13},{"imageOffset":91647292,"symbol":"base::MessagePumpNSRunLoop::DoRun(base::MessagePump::Delegate*)","symbolLocation":108,"imageIndex":1},{"imageOffset":91641824,"symbol":"base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*)","symbolLocation":212,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":91451832,"symbol":"base::Thread::Run(base::RunLoop*)","symbolLocation":60,"imageIndex":1},{"imageOffset":91452292,"symbol":"base::Thread::ThreadMain()","symbolLocation":444,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299676,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":229810815107072},{"value":0},{"value":229810815107072},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":53507},{"value":1902944},{"value":18446744073709551569},{"value":8424894640},{"value":0},{"value":0},{"value":32},{"value":229810815107072},{"value":0},{"value":229810815107072},{"value":17179869186},{"value":6363327712},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6363327056},"sp":{"value":6363326976},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299677,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":373846838345728},{"value":0},{"value":373846838345728},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":87043},{"value":1527968},{"value":18446744073709551569},{"value":8424894640},{"value":0},{"value":0},{"value":32},{"value":373846838345728},{"value":0},{"value":373846838345728},{"value":17179869186},{"value":6371749088},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6371748432},"sp":{"value":6371748352},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299678,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":284786396495872},{"value":0},{"value":284786396495872},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":66307},{"value":885712},{"value":18446744073709551569},{"value":1322856435200},{"value":0},{"value":0},{"value":32},{"value":284786396495872},{"value":0},{"value":284786396495872},{"value":17179869186},{"value":6380170464},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6380169808},"sp":{"value":6380169728},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299679,"name":"ThreadPoolSingleThreadForegroundBlocking","threadState":{"x":[{"value":268451845},{"value":17179869442},{"value":0},{"value":292482977890304},{"value":0},{"value":292482977890304},{"value":32},{"value":1742},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":68099},{"value":7},{"value":18446744073709551569},{"value":1322856438272},{"value":0},{"value":1742},{"value":32},{"value":292482977890304},{"value":0},{"value":292482977890304},{"value":17179870466},{"value":6388591792},{"value":0},{"value":18446744073709550527},{"value":1282}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6388591136},"sp":{"value":6388591056},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91418052,"symbol":"base::internal::WorkerThread::Delegate::WaitForWork()","symbolLocation":88,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420536,"symbol":"base::internal::WorkerThread::RunDedicatedWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420240,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":192,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299680,"name":"CompositorTileWorker1","threadState":{"x":[{"value":260},{"value":0},{"value":3357440},{"value":0},{"value":0},{"value":161},{"value":0},{"value":0},{"value":6397013576},{"value":0},{"value":6144},{"value":26388279072770},{"value":26388279072770},{"value":6144},{"value":0},{"value":26388279072768},{"value":305},{"value":8424894392},{"value":0},{"value":1322850925592},{"value":1322850925720},{"value":6397014240},{"value":0},{"value":0},{"value":3357440},{"value":3357441},{"value":3357696},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6588064040},"cpsr":{"value":1610612736},"fp":{"value":6397013696},"sp":{"value":6397013552},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587798796},"far":{"value":0}},"frames":[{"imageOffset":17676,"symbol":"__psynch_cvwait","symbolLocation":8,"imageIndex":11},{"imageOffset":28968,"symbol":"_pthread_cond_wait","symbolLocation":980,"imageIndex":12},{"imageOffset":91545036,"symbol":"base::ConditionVariable::Wait(base::Location const&)","symbolLocation":76,"imageIndex":1},{"imageOffset":115226636,"symbol":"cc::SingleThreadTaskGraphRunner::Run()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299693,"name":"ThreadPoolSingleThreadSharedBackgroundBlocking","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":312342906667008},{"value":0},{"value":312342906667008},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":72723},{"value":1293760},{"value":18446744073709551569},{"value":1322856465920},{"value":0},{"value":0},{"value":32},{"value":312342906667008},{"value":0},{"value":312342906667008},{"value":17179869186},{"value":6405434592},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6405433936},"sp":{"value":6405433856},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420360,"symbol":"base::internal::WorkerThread::RunBackgroundSharedWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420252,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":204,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299697,"name":"NetworkConfigWatcher","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":325468326723584},{"value":0},{"value":325468326723584},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":75779},{"value":0},{"value":18446744073709551569},{"value":8424896272},{"value":0},{"value":4294967295},{"value":2},{"value":325468326723584},{"value":0},{"value":325468326723584},{"value":21592279046},{"value":6413852152},{"value":8589934592},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6413852000},"sp":{"value":6413851920},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":516312,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":160,"imageIndex":5},{"imageOffset":510404,"symbol":"__CFRunLoopRun","symbolLocation":1188,"imageIndex":5},{"imageOffset":1372612,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":532,"imageIndex":5},{"imageOffset":367428,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":212,"imageIndex":13},{"imageOffset":91647292,"symbol":"base::MessagePumpNSRunLoop::DoRun(base::MessagePump::Delegate*)","symbolLocation":108,"imageIndex":1},{"imageOffset":91641824,"symbol":"base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*)","symbolLocation":212,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":91451832,"symbol":"base::Thread::Run(base::RunLoop*)","symbolLocation":60,"imageIndex":1},{"imageOffset":91452292,"symbol":"base::Thread::ThreadMain()","symbolLocation":444,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299698,"name":"ThreadPoolSingleThreadForegroundBlocking","threadState":{"x":[{"value":268451845},{"value":17179869442},{"value":0},{"value":334281599614976},{"value":0},{"value":334281599614976},{"value":32},{"value":1740},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":77831},{"value":7},{"value":18446744073709551569},{"value":1322856456704},{"value":0},{"value":1740},{"value":32},{"value":334281599614976},{"value":0},{"value":334281599614976},{"value":17179870466},{"value":6422277296},{"value":0},{"value":18446744073709550527},{"value":1282}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6422276640},"sp":{"value":6422276560},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91418052,"symbol":"base::internal::WorkerThread::Delegate::WaitForWork()","symbolLocation":88,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420536,"symbol":"base::internal::WorkerThread::RunDedicatedWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420240,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":192,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299700,"name":"ThreadPoolSingleThreadSharedForegroundBlocking","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":321173359427584},{"value":0},{"value":321173359427584},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":74779},{"value":7},{"value":18446744073709551569},{"value":1322856455168},{"value":0},{"value":0},{"value":32},{"value":321173359427584},{"value":0},{"value":321173359427584},{"value":17179869186},{"value":6430698720},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6430698064},"sp":{"value":6430697984},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420492,"symbol":"base::internal::WorkerThread::RunSharedWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420228,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":180,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299722,"name":"NetworkConfigWatcher","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":376045861601280},{"value":0},{"value":376045861601280},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":87555},{"value":0},{"value":18446744073709551569},{"value":8424896272},{"value":0},{"value":4294967295},{"value":2},{"value":376045861601280},{"value":0},{"value":376045861601280},{"value":21592279046},{"value":6439116280},{"value":8589934592},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6439116128},"sp":{"value":6439116048},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":516312,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":160,"imageIndex":5},{"imageOffset":510404,"symbol":"__CFRunLoopRun","symbolLocation":1188,"imageIndex":5},{"imageOffset":1372612,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":532,"imageIndex":5},{"imageOffset":367428,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":212,"imageIndex":13},{"imageOffset":91647292,"symbol":"base::MessagePumpNSRunLoop::DoRun(base::MessagePump::Delegate*)","symbolLocation":108,"imageIndex":1},{"imageOffset":91641824,"symbol":"base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*)","symbolLocation":212,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":91451832,"symbol":"base::Thread::Run(base::RunLoop*)","symbolLocation":60,"imageIndex":1},{"imageOffset":91452292,"symbol":"base::Thread::ThreadMain()","symbolLocation":444,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299723,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":380512627589120},{"value":0},{"value":380512627589120},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":88595},{"value":8},{"value":18446744073709551569},{"value":1322856452096},{"value":0},{"value":0},{"value":32},{"value":380512627589120},{"value":0},{"value":380512627589120},{"value":17179869186},{"value":12893301984},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":12893301328},"sp":{"value":12893301248},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299724,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":379413115961344},{"value":0},{"value":379413115961344},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":88339},{"value":346400},{"value":18446744073709551569},{"value":12901724160},{"value":0},{"value":0},{"value":32},{"value":379413115961344},{"value":0},{"value":379413115961344},{"value":17179869186},{"value":12901723360},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":12901722704},"sp":{"value":12901722624},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299725,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":554166745300992},{"value":0},{"value":554166745300992},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":129027},{"value":466048},{"value":18446744073709551569},{"value":8424894632},{"value":0},{"value":0},{"value":32},{"value":554166745300992},{"value":0},{"value":554166745300992},{"value":17179869186},{"value":12910144736},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":12910144080},"sp":{"value":12910144000},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299726,"name":"ThreadPoolForegroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":553067233673216},{"value":0},{"value":553067233673216},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":128771},{"value":1767296},{"value":18446744073709551569},{"value":1322856449024},{"value":0},{"value":0},{"value":32},{"value":553067233673216},{"value":0},{"value":553067233673216},{"value":17179869186},{"value":12918566112},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":12918565456},"sp":{"value":12918565376},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420448,"symbol":"base::internal::WorkerThread::RunPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420168,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":120,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299767,"name":"CacheThread_BlockFile","threadState":{"x":[{"value":4},{"value":0},{"value":0},{"value":1322882155184},{"value":2},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":1146},{"value":143947018250},{"value":16383},{"value":0},{"value":72},{"value":7},{"value":369},{"value":12926988288},{"value":0},{"value":1322852512544},{"value":1322875517184},{"value":0},{"value":12297829382473034411},{"value":4846438336,"symbolLocation":0,"symbol":"partition_alloc::internal::PartitionAddressSpace::setup_"},{"value":1},{"value":1322852512936},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4706111928},"cpsr":{"value":2684354560},"fp":{"value":12926987648},"sp":{"value":12926987600},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587833256},"far":{"value":0}},"frames":[{"imageOffset":52136,"symbol":"kevent64","symbolLocation":8,"imageIndex":11},{"imageOffset":91722168,"symbol":"base::MessagePumpKqueue::DoInternalWork(base::MessagePump::Delegate*, base::MessagePump::Delegate::NextWorkInfo*)","symbolLocation":176,"imageIndex":1},{"imageOffset":91721924,"symbol":"base::MessagePumpKqueue::Run(base::MessagePump::Delegate*)","symbolLocation":232,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":91451832,"symbol":"base::Thread::Run(base::RunLoop*)","symbolLocation":60,"imageIndex":1},{"imageOffset":91452292,"symbol":"base::Thread::ThreadMain()","symbolLocation":444,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299768,"name":"ThreadPoolSingleThreadSharedForeground","threadState":{"x":[{"value":268451845},{"value":17179869442},{"value":0},{"value":531077001117696},{"value":0},{"value":531077001117696},{"value":32},{"value":1734},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":123651},{"value":7},{"value":18446744073709551569},{"value":1322856462848},{"value":0},{"value":1734},{"value":32},{"value":531077001117696},{"value":0},{"value":531077001117696},{"value":17179870466},{"value":12935408816},{"value":0},{"value":18446744073709550527},{"value":1282}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":12935408160},"sp":{"value":12935408080},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91418052,"symbol":"base::internal::WorkerThread::Delegate::WaitForWork()","symbolLocation":88,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420492,"symbol":"base::internal::WorkerThread::RunSharedWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420228,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":180,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36299830,"name":"VSyncThread","threadState":{"x":[{"value":0},{"value":21592279046},{"value":8589934592},{"value":582754047623168},{"value":0},{"value":582754047623168},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":135683},{"value":0},{"value":18446744073709551569},{"value":8424896272},{"value":0},{"value":4294967295},{"value":2},{"value":582754047623168},{"value":0},{"value":582754047623168},{"value":21592279046},{"value":12943826424},{"value":8589934592},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":12943826272},"sp":{"value":12943826192},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":516312,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":160,"imageIndex":5},{"imageOffset":510404,"symbol":"__CFRunLoopRun","symbolLocation":1188,"imageIndex":5},{"imageOffset":1372612,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":532,"imageIndex":5},{"imageOffset":367428,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":212,"imageIndex":13},{"imageOffset":91647292,"symbol":"base::MessagePumpNSRunLoop::DoRun(base::MessagePump::Delegate*)","symbolLocation":108,"imageIndex":1},{"imageOffset":91641824,"symbol":"base::MessagePumpCFRunLoopBase::Run(base::MessagePump::Delegate*)","symbolLocation":212,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":91451832,"symbol":"base::Thread::Run(base::RunLoop*)","symbolLocation":60,"imageIndex":1},{"imageOffset":91452292,"symbol":"base::Thread::ThreadMain()","symbolLocation":444,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36301506,"name":"ThreadPoolBackgroundWorker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":1115106654027776},{"value":0},{"value":1115106654027776},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":259631},{"value":1898624},{"value":18446744073709551569},{"value":4706384484,"symbolLocation":0,"symbol":"allocator_shim::(anonymous namespace)::MallocZoneTryFreeDefault(_malloc_zone_t*, void*)"},{"value":0},{"value":0},{"value":32},{"value":1115106654027776},{"value":0},{"value":1115106654027776},{"value":17179869186},{"value":12952251616},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":12952250960},"sp":{"value":12952250880},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":91417948,"symbol":"base::internal::WorkerThread::Delegate::TimedWait(base::TimeDelta)","symbolLocation":68,"imageIndex":1},{"imageOffset":91420932,"symbol":"base::internal::WorkerThread::RunWorker()","symbolLocation":368,"imageIndex":1},{"imageOffset":91420316,"symbol":"base::internal::WorkerThread::RunBackgroundPooledWorker()","symbolLocation":16,"imageIndex":1},{"imageOffset":91420216,"symbol":"base::internal::WorkerThread::ThreadMain()","symbolLocation":168,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36301507,"name":"org.libusb.device-hotplug","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":681607014907904},{"value":0},{"value":681607014907904},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":158699},{"value":0},{"value":18446744073709551569},{"value":6585912552,"symbolLocation":0,"symbol":"malloc"},{"value":0},{"value":4294967295},{"value":2},{"value":681607014907904},{"value":0},{"value":681607014907904},{"value":21592279046},{"value":6439690280},{"value":8589934592},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":6439690128},"sp":{"value":6439690048},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":516312,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":160,"imageIndex":5},{"imageOffset":510404,"symbol":"__CFRunLoopRun","symbolLocation":1188,"imageIndex":5},{"imageOffset":1372612,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":532,"imageIndex":5},{"imageOffset":994036,"symbol":"CFRunLoopRun","symbolLocation":64,"imageIndex":5},{"imageOffset":129322860,"symbol":"darwin_event_thread_main","symbolLocation":272,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36301508,"name":"UsbEventHandler","threadState":{"x":[{"value":4},{"value":0},{"value":60000},{"value":32},{"value":65536},{"value":12960672104},{"value":12960672103},{"value":0},{"value":60000},{"value":0},{"value":0},{"value":0},{"value":0},{"value":6972335344368746496},{"value":11474408729340805119},{"value":242776272},{"value":230},{"value":242776272},{"value":0},{"value":1322910438400},{"value":1323096781152},{"value":2},{"value":12960673136},{"value":1322910438744},{"value":1322910438736},{"value":12960673272},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4743702004},"cpsr":{"value":1610612736},"fp":{"value":12960673120},"sp":{"value":12960673056},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587819768},"far":{"value":0}},"frames":[{"imageOffset":38648,"symbol":"poll","symbolLocation":8,"imageIndex":11},{"imageOffset":129312244,"symbol":"handle_events","symbolLocation":228,"imageIndex":1},{"imageOffset":129311592,"symbol":"libusb_handle_events_timeout_completed","symbolLocation":612,"imageIndex":1},{"imageOffset":129312612,"symbol":"libusb_handle_events","symbolLocation":36,"imageIndex":1},{"imageOffset":129254828,"symbol":"device::UsbContext::UsbEventHandler::Run()","symbolLocation":172,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36335406,"name":"caulk.messenger.shared:17","threadState":{"x":[{"value":14},{"value":1322940961690},{"value":0},{"value":6441414762},{"value":1322940961664},{"value":25},{"value":0},{"value":0},{"value":0},{"value":4294967295},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":18446744073709551580},{"value":8424898768},{"value":0},{"value":1322916715040},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6799130112},"cpsr":{"value":2147483648},"fp":{"value":6441414528},"sp":{"value":6441414496},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784112},"far":{"value":0}},"frames":[{"imageOffset":2992,"symbol":"semaphore_wait_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":7680,"symbol":"caulk::semaphore::timed_wait(double)","symbolLocation":224,"imageIndex":15},{"imageOffset":7340,"symbol":"caulk::concurrent::details::worker_thread::run()","symbolLocation":32,"imageIndex":15},{"imageOffset":6476,"symbol":"void* caulk::thread_proxy<std::__1::tuple<caulk::thread::attributes, void (caulk::concurrent::details::worker_thread::*)(), std::__1::tuple<caulk::concurrent::details::worker_thread*>>>(void*)","symbolLocation":96,"imageIndex":15},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36335407,"name":"caulk.messenger.shared:high","threadState":{"x":[{"value":14},{"value":1322858775324},{"value":0},{"value":6441988204},{"value":1322858775296},{"value":27},{"value":0},{"value":0},{"value":0},{"value":4294967295},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":18446744073709551580},{"value":8424898768},{"value":0},{"value":1322916748320},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6799130112},"cpsr":{"value":2147483648},"fp":{"value":6441987968},"sp":{"value":6441987936},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784112},"far":{"value":0}},"frames":[{"imageOffset":2992,"symbol":"semaphore_wait_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":7680,"symbol":"caulk::semaphore::timed_wait(double)","symbolLocation":224,"imageIndex":15},{"imageOffset":7340,"symbol":"caulk::concurrent::details::worker_thread::run()","symbolLocation":32,"imageIndex":15},{"imageOffset":6476,"symbol":"void* caulk::thread_proxy<std::__1::tuple<caulk::thread::attributes, void (caulk::concurrent::details::worker_thread::*)(), std::__1::tuple<caulk::concurrent::details::worker_thread*>>>(void*)","symbolLocation":96,"imageIndex":15},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":36341018,"name":"PowerSaveBlocker","threadState":{"x":[{"value":268451845},{"value":17179869186},{"value":0},{"value":596085626109952},{"value":0},{"value":596085626109952},{"value":32},{"value":0},{"value":0},{"value":17179869184},{"value":32},{"value":0},{"value":0},{"value":0},{"value":138787},{"value":7},{"value":18446744073709551569},{"value":12969095168},{"value":0},{"value":0},{"value":32},{"value":596085626109952},{"value":0},{"value":596085626109952},{"value":17179869186},{"value":12969094096},{"value":0},{"value":18446744073709550527},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6587860340},"cpsr":{"value":0},"fp":{"value":12969093440},"sp":{"value":12969093360},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587784244},"far":{"value":0}},"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":11},{"imageOffset":79220,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":11},{"imageOffset":39360,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":11},{"imageOffset":4032,"symbol":"mach_msg","symbolLocation":24,"imageIndex":11},{"imageOffset":91666728,"symbol":"base::WaitableEvent::TimedWaitImpl(base::TimeDelta)","symbolLocation":352,"imageIndex":1},{"imageOffset":91216512,"symbol":"base::WaitableEvent::TimedWait(base::TimeDelta, base::Location const&)","symbolLocation":136,"imageIndex":1},{"imageOffset":90940692,"symbol":"base::MessagePumpDefault::Run(base::MessagePump::Delegate*)","symbolLocation":536,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":91451832,"symbol":"base::Thread::Run(base::RunLoop*)","symbolLocation":60,"imageIndex":1},{"imageOffset":91452292,"symbol":"base::Thread::ThreadMain()","symbolLocation":444,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":37023904,"name":"Chrome_DevToolsADBThread","threadState":{"x":[{"value":4},{"value":0},{"value":0},{"value":1323030927280},{"value":2},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":5},{"value":16383},{"value":0},{"value":112},{"value":7},{"value":369},{"value":12977516544},{"value":0},{"value":1322988585248},{"value":1322978876960},{"value":0},{"value":12297829382473034411},{"value":4846438336,"symbolLocation":0,"symbol":"partition_alloc::internal::PartitionAddressSpace::setup_"},{"value":1},{"value":1322988585640},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4706111928},"cpsr":{"value":2684354560},"fp":{"value":12977515904},"sp":{"value":12977515856},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6587833256},"far":{"value":0}},"frames":[{"imageOffset":52136,"symbol":"kevent64","symbolLocation":8,"imageIndex":11},{"imageOffset":91722168,"symbol":"base::MessagePumpKqueue::DoInternalWork(base::MessagePump::Delegate*, base::MessagePump::Delegate::NextWorkInfo*)","symbolLocation":176,"imageIndex":1},{"imageOffset":91721924,"symbol":"base::MessagePumpKqueue::Run(base::MessagePump::Delegate*)","symbolLocation":232,"imageIndex":1},{"imageOffset":91326468,"symbol":"base::sequence_manager::internal::ThreadControllerWithMessagePumpImpl::Run(bool, base::TimeDelta)","symbolLocation":316,"imageIndex":1},{"imageOffset":91109400,"symbol":"base::RunLoop::Run(base::Location const&)","symbolLocation":396,"imageIndex":1},{"imageOffset":91451832,"symbol":"base::Thread::Run(base::RunLoop*)","symbolLocation":60,"imageIndex":1},{"imageOffset":91452292,"symbol":"base::Thread::ThreadMain()","symbolLocation":444,"imageIndex":1},{"imageOffset":91547180,"symbol":"base::(anonymous namespace)::ThreadFunc(void*)","symbolLocation":208,"imageIndex":1},{"imageOffset":27736,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":12},{"imageOffset":7196,"symbol":"thread_start","symbolLocation":8,"imageIndex":12}]},{"id":38372786,"frames":[],"threadState":{"x":[{"value":6166196224},{"value":280019},{"value":6165659648},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":0},"fp":{"value":0},"sp":{"value":6166196224},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6588042248},"far":{"value":0}}},{"id":38418035,"frames":[],"threadState":{"x":[{"value":6167916544},{"value":325231},{"value":6167379968},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":0},"fp":{"value":0},"sp":{"value":6167916544},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6588042248},"far":{"value":0}}},{"id":38455982,"frames":[],"threadState":{"x":[{"value":6166769664},{"value":215907},{"value":6166233088},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":0},"fp":{"value":0},"sp":{"value":6166769664},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6588042248},"far":{"value":0}}},{"id":38456793,"frames":[],"threadState":{"x":[{"value":6167343104},{"value":0},{"value":6166806528},{"value":0},{"value":278532},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":0},"fp":{"value":0},"sp":{"value":6167343104},"esr":{"value":0},"pc":{"value":6588042248},"far":{"value":0}}}],
  "usedImages" : [
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4301242368,
    "CFBundleShortVersionString" : "150.0.7871.46",
    "CFBundleIdentifier" : "com.menketechnologies.zwire",
    "size" : 16384,
    "uuid" : "4c4c446f-5555-3144-a178-702a5102c559",
    "path" : "\/Applications\/zwire.app\/Contents\/Resources\/browser\/zwire.app\/Contents\/MacOS\/zwire",
    "name" : "zwire",
    "CFBundleVersion" : "7871.46"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4614389760,
    "CFBundleShortVersionString" : "150.0.7871.46",
    "CFBundleIdentifier" : "com.menketechnologies.zwire.framework",
    "size" : 220512256,
    "uuid" : "4c4c448f-5555-3144-a128-4d4b0230aef1",
    "path" : "\/Applications\/zwire.app\/Contents\/Resources\/browser\/zwire.app\/Contents\/Frameworks\/zwire Framework.framework\/Versions\/150.0.7871.46\/zwire Framework",
    "name" : "zwire Framework",
    "CFBundleVersion" : "7871.46"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 4483055616,
    "size" : 49152,
    "uuid" : "ca58aa96-b997-3a6d-9132-19d49be4b3e9",
    "path" : "\/usr\/lib\/libobjc-trampolines.dylib",
    "name" : "libobjc-trampolines.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 4538351616,
    "CFBundleShortVersionString" : "351.2",
    "CFBundleIdentifier" : "com.apple.AGXMetalG17X",
    "size" : 10207232,
    "uuid" : "81e8aeac-3aa5-3303-a8d0-b18b74a6d94b",
    "path" : "\/System\/Library\/Extensions\/AGXMetalG17X.bundle\/Contents\/MacOS\/AGXMetalG17X",
    "name" : "AGXMetalG17X",
    "CFBundleVersion" : "351.2"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 4538073088,
    "CFBundleShortVersionString" : "3.0",
    "CFBundleIdentifier" : "com.apple.security.csparser",
    "size" : 114688,
    "uuid" : "3bcf8cf8-291e-348f-8aa5-7408851d3c05",
    "path" : "\/System\/Library\/Frameworks\/Security.framework\/Versions\/A\/PlugIns\/csparser.bundle\/Contents\/MacOS\/csparser",
    "name" : "csparser",
    "CFBundleVersion" : "61901.120.67"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6588321792,
    "CFBundleShortVersionString" : "6.9",
    "CFBundleIdentifier" : "com.apple.CoreFoundation",
    "size" : 5628704,
    "uuid" : "04e3598b-f226-3250-b3b2-ce938dd4db7e",
    "path" : "\/System\/Library\/Frameworks\/CoreFoundation.framework\/Versions\/A\/CoreFoundation",
    "name" : "CoreFoundation",
    "CFBundleVersion" : "5026.5.4"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6803955712,
    "CFBundleShortVersionString" : "2.1.1",
    "CFBundleIdentifier" : "com.apple.HIToolbox",
    "size" : 3125536,
    "uuid" : "8716490e-acc2-3688-8c2f-5ca42b4c9da9",
    "path" : "\/System\/Library\/Frameworks\/Carbon.framework\/Versions\/A\/Frameworks\/HIToolbox.framework\/Versions\/A\/HIToolbox",
    "name" : "HIToolbox"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6660091904,
    "CFBundleShortVersionString" : "6.9",
    "CFBundleIdentifier" : "com.apple.AppKit",
    "size" : 24260512,
    "uuid" : "cf57a4fc-4be3-3d95-b543-d744e8718b26",
    "path" : "\/System\/Library\/Frameworks\/AppKit.framework\/Versions\/C\/AppKit",
    "name" : "AppKit",
    "CFBundleVersion" : "2685.60.104"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6584008704,
    "size" : 680472,
    "uuid" : "a237ef81-b68b-37ba-a165-92c965529534",
    "path" : "\/usr\/lib\/dyld",
    "name" : "dyld"
  },
  {
    "size" : 0,
    "source" : "A",
    "base" : 0,
    "uuid" : "00000000-0000-0000-0000-000000000000"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6588088320,
    "size" : 35172,
    "uuid" : "160fd864-8d15-36fc-9e97-9725388cfafe",
    "path" : "\/usr\/lib\/system\/libsystem_platform.dylib",
    "name" : "libsystem_platform.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6587781120,
    "size" : 250544,
    "uuid" : "cc1cf985-bc65-3725-809f-4c1e36b8f4ba",
    "path" : "\/usr\/lib\/system\/libsystem_kernel.dylib",
    "name" : "libsystem_kernel.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6588035072,
    "size" : 52028,
    "uuid" : "4f33683c-18c8-39a1-800b-2e3bd43bcc13",
    "path" : "\/usr\/lib\/system\/libsystem_pthread.dylib",
    "name" : "libsystem_pthread.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6613934080,
    "CFBundleShortVersionString" : "6.9",
    "CFBundleIdentifier" : "com.apple.Foundation",
    "size" : 16655392,
    "uuid" : "49dd529f-1708-3767-997b-1a4639a07536",
    "path" : "\/System\/Library\/Frameworks\/Foundation.framework\/Versions\/C\/Foundation",
    "name" : "Foundation",
    "CFBundleVersion" : "5026.5.4"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6585909248,
    "size" : 328152,
    "uuid" : "5fae4807-4d2b-3a95-a63a-dd96d3da11b4",
    "path" : "\/usr\/lib\/system\/libsystem_malloc.dylib",
    "name" : "libsystem_malloc.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6799122432,
    "CFBundleShortVersionString" : "1.0",
    "CFBundleIdentifier" : "com.apple.audio.caulk",
    "size" : 168032,
    "uuid" : "47e71130-9608-3d99-aceb-df5638bc08df",
    "path" : "\/System\/Library\/PrivateFrameworks\/caulk.framework\/Versions\/A\/caulk",
    "name" : "caulk"
  }
],
  "sharedCache" : {
  "base" : 6582878208,
  "size" : 5990596608,
  "uuid" : "ff7119a7-f64d-305d-8135-7e6eb1c207d1"
},
  "legacyInfo" : {
  "threadTriggered" : {
    "name" : "CrBrowserMain",
    "queue" : "com.apple.main-thread"
  }
},
  "logWritingSignature" : "217c83ed0033acf1bc7e9c15bbe5fc6967991474",
  "roots_installed" : 0,
  "bug_type" : "309",
  "trmStatus" : 1,
  "trialInfo" : {
  "rollouts" : [
    {
      "rolloutId" : "60f8ddccefea4203d95cbeef",
      "factorPackIds" : [

      ],
      "deploymentId" : 240000025
    },
    {
      "rolloutId" : "654439cdafbf5b61207873a9",
      "factorPackIds" : [

      ],
      "deploymentId" : 240000004
    }
  ],
  "experiments" : [

  ]
}
}

Model: Mac17,6, BootROM 18000.120.36, proc 18:6:0:12 processors, 64 GB, SMC 
Graphics: Apple M5 Max, Apple M5 Max, Built-In
Display: Color LCD, 3456 x 2234 Retina, Main, MirrorOff, Online
Memory Module: LPDDR5, Samsung
AirPort: chip id: 0x11 api 1.2 firmware [Rev 72.129.725 N1B1 devFused=0] phy [20.1.62.0], core80211 [324.129.732 N1_silicon_b ], Apr 18 2026 18:00:58 version XBS_BUILD_TAG GIT_DESCRIBE FWID chip id: 0x11 api 1.2 firmware [Rev 72.129.725 N1B1 devFused=0] phy [20.1.62.0], core80211 [324.129.732 N1_silicon_b ]
IO80211_driverkit-1561.3 "IO80211_driverkit-1561.3" Apr 18 2026 17:42:26
AirPort: 
Bluetooth: Version (null), 0 services, 0 devices, 0 incoming serial ports
Network Service: Wi-Fi, AirPort, en0
Thunderbolt Bus: MacBook Pro, Apple Inc.
Thunderbolt Bus: MacBook Pro, Apple Inc.
Thunderbolt Bus: MacBook Pro, Apple Inc.

