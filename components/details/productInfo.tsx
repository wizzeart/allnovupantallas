'use client'

import { Tabs, TabsContent, TabsContents, TabsHighlight, TabsHighlightItem, TabsList, TabsTrigger } from "../animate-ui/primitives/animate/tabs";
import { Products2 } from "./details";

export function ProductInfo({ product }: { product: Products2 }) {
    return (
        <div className="w-full px-4 py-6">
            <Tabs defaultValue={"specs"}>
                <TabsHighlight className="bg-background absolute z-0 inset-0">
                    <TabsList className="h-10 inline-flex p-1 bg-accent w-full">
                        <TabsHighlightItem value="specs" className="flex-1">
                            <TabsTrigger
                                value="specs"
                                className="h-full px-4 py-2 leading-0 w-full text-lg"
                            >
                                Características
                            </TabsTrigger>
                        </TabsHighlightItem>
                        <TabsHighlightItem value="desc" className="flex-1">
                            <TabsTrigger
                                value="desc"
                                className="h-full px-4 py-2 leading-0 w-full text-lg"
                            >
                                Descripción
                            </TabsTrigger>
                        </TabsHighlightItem>
                    </TabsList>
                </TabsHighlight>
                <TabsContents className="bg-background p-3 border-4 border-accent border-t-0">
                    <TabsContent value="desc" className="pt-6 text-lg w-full text-white">
                        <div
                            className="w-full px-4 text-black dark:text-zinc-300 text-lg leading-relaxed prose prose-zinc dark:prose-invert max-w-none
                        [&>p]:mb-4 [&>h3]:font-bold [&>h3]:text-xl [&>h3]:mb-3 [&>h3]:mt-6 [&>h3]:text-black [&>h3]:dark:text-black
                        [&>h4]:font-normal [&>h4]:text-base [&>h4]:mb-2 [&>h4]:mt-4 [&>h4]:text-black [&>h4]:dark:text-zinc-300
                        [&>p>strong]:font-bold [&>p>strong]:text-black [&>p>strong]:dark:text-black
                        [&>p>mark]:bg-yellow-200 [&>p>mark]:dark:bg-yellow-500/30 [&>p>mark]:px-1 [&>p>mark]:font-bold
                        [&_br]:block [&_br]:my-1"
                            dangerouslySetInnerHTML={{ __html: product.descripcion || '' }}
                        />
                    </TabsContent>

                    <TabsContent value="specs" className="pt-6 w-full">
                        <div
                            className="w-full px-4 text-lg text-black dark:text-zinc-300 leading-relaxed prose prose-zinc dark:prose-invert max-w-none
                        [&>p]:mb-4 [&>h3]:font-bold [&>h3]:text-xl [&>h3]:mb-3 [&>h3]:mt-6 [&>h3]:text-black [&>h3]:dark:text-black
                        [&>h4]:font-normal [&>h4]:text-base [&>h4]:mb-2 [&>h4]:mt-4 [&>h4]:text-black [&>h4]:dark:text-zinc-300
                        [&>p>strong]:font-bold [&>p>strong]:text-black [&>p>strong]:dark:text-black"
                            dangerouslySetInnerHTML={{ __html: product.descripcionCorta || '' }}
                        />
                    </TabsContent>
                </TabsContents>
            </Tabs>

        </div>
    )
}