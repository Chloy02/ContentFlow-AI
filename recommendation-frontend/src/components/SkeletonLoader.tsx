export const SkeletonCard = () => {
    return (
        <div className="bg-slate-800/50 rounded-2xl overflow-hidden border border-white/10 animate-pulse">
            {/* Image skeleton */}
            <div className="w-full h-72 bg-gradient-to-br from-slate-700 to-slate-800 shimmer"></div>
            
            {/* Content skeleton */}
            <div className="p-5 space-y-3">
                {/* Title */}
                <div className="h-6 bg-slate-700 rounded-lg w-3/4"></div>
                <div className="h-6 bg-slate-700 rounded-lg w-1/2"></div>
                
                {/* Author */}
                <div className="h-4 bg-slate-700 rounded w-1/3"></div>
                
                {/* Description */}
                <div className="space-y-2">
                    <div className="h-3 bg-slate-700 rounded w-full"></div>
                    <div className="h-3 bg-slate-700 rounded w-full"></div>
                    <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                </div>
                
                {/* Button */}
                <div className="h-10 bg-slate-700 rounded-xl w-full"></div>
            </div>
        </div>
    );
};

export const SkeletonGrid = ({ count = 6 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
};

export const SkeletonHero = () => {
    return (
        <div className="relative h-[85vh] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 animate-pulse">
            <div className="relative container h-full flex items-center">
                <div className="max-w-2xl space-y-6 pt-20">
                    {/* Badge */}
                    <div className="h-10 w-40 bg-slate-700 rounded-full"></div>
                    
                    {/* Title */}
                    <div className="space-y-3">
                        <div className="h-16 bg-slate-700 rounded-lg w-full"></div>
                        <div className="h-16 bg-slate-700 rounded-lg w-3/4"></div>
                    </div>
                    
                    {/* Author */}
                    <div className="h-6 bg-slate-700 rounded w-1/3"></div>
                    
                    {/* Description */}
                    <div className="space-y-2 max-w-xl">
                        <div className="h-4 bg-slate-700 rounded w-full"></div>
                        <div className="h-4 bg-slate-700 rounded w-full"></div>
                        <div className="h-4 bg-slate-700 rounded w-2/3"></div>
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <div className="h-14 w-40 bg-slate-700 rounded-xl"></div>
                        <div className="h-14 w-32 bg-slate-700 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
