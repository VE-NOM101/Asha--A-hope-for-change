<template>
    <div
        class=" rounded-ss-4xl rounded-ee-4xl group p-2 border-2 border-black/50 dark:border-white/50 card group relative z-[1] block h-[370px] w-[320px] cursor-pointer overflow-hidden  hover:-translate-y-2.5 hover:dark:shadow-(--purpleShadow) hover:shadow-(--cyanShadow) hover:dark:border-indigo-600/70 hover:border-cyan-600/70 transition-all duration-300">
        <div
            class="flex justify-center font-bold font-special text-2xl group-hover:text-cyan-600/70 group-hover:dark:text-indigo-600/70">
            <h1>Fund riser</h1>
        </div>

        <div class="m-.5 flex justify-between">
            <img src="/assets/superman.jpg" class="h-[150px] w-full" />
        </div>
        <div class="mt-1">
            <div
                class="flex justify-between items-center p-1 min-h-[50px] w-full border-b-2 border-lightText/80 dark:border-darkText/80 rounded-lg">
                <h1 class="font-bold">
                    Created by
                </h1>
                <h2>
                    0x123
                </h2>
            </div>

            <div
                class="flex justify-between items-center p-1 min-h-[50px] w-full border-b-2 border-lightText/80 dark:border-darkText/80 rounded-lg">
                <h1 class="font-bold">
                    Date
                </h1>
                <h2>
                    Jan-21-2025
                </h2>
            </div>
            <div
                class="flex justify-between items-center p-1 min-h-[50px] w-full border-b-2 border-lightText/80 dark:border-darkText/80 rounded-lg">
                <h1 class="font-bold">
                    Amount
                </h1>
                <h2>
                    1000 ETH
                </h2>
            </div>
        </div>
    </div>
</template>