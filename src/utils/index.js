export function mapFilters(filters) {
  return filters.reduce((result, filter) => {
    result[filter] = function(...args) {
      return this.$options.filters[filter](...args);
    };
    return result;
  }, {});
}

export function mean(inputData){
    let arr= inputData.data;
    const length=arr.length;

    const total= arr.reduce((acc,val) => acc+val);
    const mean = total/length;
    return mean.toFixed(2);
}

// export default mean();

export function median(inputData){
    let arr= inputData.data;
    let length=arr.length;

    let median=0;
    let sorted=arr.sort();

    // For even number of values, median is the avg. of the middle two numbers
    // For odd, median is the middle value exactly
    if(length%2===0){
        let p=sorted[length/2];
        let q=sorted[(length/2)-1];
        median=(p+q)/2
    }
    else{
        median=sorted[(length-1)/2]
    }
    return median.toFixed(2);
}

//IMPLEMETING THE MODE FUNCTIONALITY
export function mode(inputData){
    let arr= inputData.data;
    let length=arr.length;

    let mode=0;
    let count=1;
    let value=0, prev_val=0;
    let prev_count=0;
    let sorted=arr.sort();

    for(let i=0;i<length;i++){
     if(sorted[i]==sorted[i+1]){
         count++;
         value=sorted[i];
     }
     else{
         if(count>prev_count){
             prev_count=count;
             prev_val=value;
         }
         count=1;
     }
     }
     count>prev_count ? mode=value : mode=prev_val;

     return mode;
}

export function standardDeviation(inputData){
    let arr= inputData.data;
    let length=arr.length;

    const squared_arr =[];
        let sum=0;
        for(let i=0;i<length;i++){
            squared_arr[i]=(arr[i]) ** 2;
            sum=sum+squared_arr[i];
        }

        const mean_of_squared=sum/length;
        const total= arr.reduce((acc,val) => acc+val);
        const mean = total/length;
        // let mean=mean(inputData);
        const StandardDeviation= (mean_of_squared-(mean)**2)**(1/2);
        return StandardDeviation.toFixed(2);

}
