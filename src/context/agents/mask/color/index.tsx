// Need to process the line-color because is changed inside the layer
export const processPaintProperties = (paint: any, property: string) => {
    const processedPaint = { ...paint };
    if (paint[property]) {
        const color = paint[property];
        processedPaint[property] = `
        	rgba(
        		${Math.round(color.r * 255)}, 
        		${Math.round(color.g * 255)}, 
        		${Math.round(color.b * 255)}, 
        		${color.a}
        	)
        `.replace(/\s/g, '');
    }
    return processedPaint;
};