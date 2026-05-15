"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const LIMIT = 6;

async function getProducts(pageParam: number) {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const allProducts: Product[] = await res.json();

  const start = (pageParam - 1) * LIMIT;
  const end = start + LIMIT;

  const slicedProducts = allProducts.slice(start, end);

  return {
    data: slicedProducts,
    nextPage: end < allProducts.length ? pageParam + 1 : undefined,
  };
}

function ProductCard({ product }: { product: Product }) {
  const [imageSrc, setImageSrc] = useState(product.image);

  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-3xl border border-border",
        "bg-background shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
      )}
    >
      <div className="relative h-[280px] overflow-hidden bg-muted">
        {imageLoading && (
          <Skeleton className="absolute inset-0 z-10 h-full w-full rounded-none" />
        )}

        <Image
          src={imageSrc}
          alt={product.title}
          fill
          unoptimized
          priority={false}
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
          className={cn(
            "object-contain  transition-all duration-500",
            "group-hover:scale-105",
            imageLoading ? "opacity-0" : "opacity-100",
          )}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageSrc("/miles.png");
            setImageLoading(false);
          }}
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {product.category}
        </div>

        <div className="space-y-2">
          <h2 className="line-clamp-1 text-lg font-semibold">
            {product.title}
          </h2>

          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="text-2xl font-bold">${product.price}</div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <>
      {Array.from({
        length: LIMIT,
      }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl border border-border bg-background"
        >
          <Skeleton className="h-[280px] w-full rounded-none" />

          <div className="space-y-4 p-5">
            <Skeleton className="h-5 w-24 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>

            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </>
  );
}

function Page() {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => getProducts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  if (isError) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <p className="text-destructive">Failed to load products.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-10 lg:px-10">
      <div className="mb-10 space-y-3">
        <h1 className="text-5xl font-bold tracking-tight">Projects</h1>

        <p className="max-w-2xl text-muted-foreground">
          Infinite scrolling project showcase built with Next.js, React Query,
          Intersection Observer, and shadcn/ui.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      <div ref={ref} className="flex w-full items-center justify-center py-10">
        {isFetchingNextPage && <Loader2 className="size-7 animate-spin" />}

        {!hasNextPage && products.length > 0 && (
          <p className="text-sm text-muted-foreground">
            No more projects to load.
          </p>
        )}
      </div>
    </div>
  );
}

export default Page;
