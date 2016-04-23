var HashTable = function() {
//Params no need to adjust
  this._limit = 8;
  this._tupleCount = 0;
  this._storage = LimitedArray(this._limit);
  // this._resizing = false;
  this.minLimit = 4;
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  if (Array.isArray(bucket)) {
    bucket.push([k, v]);
    this._tupleCount++;
  } else {
    this._storage.set(index, [[k, v]]);
    this._tupleCount++;
  }
  this.resize();
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  // debugger;
  return bucket.reduce(function(result, tuple) {
    if (tuple[0] === k) {
      return tuple[1];
    }
    return result;
  }, undefined);
};

HashTable.prototype.remove = function(k) {
  // alert('removing ' + k);
  var index = getIndexBelowMaxForKey(k, this._limit);
  // alert('current index: ' + index + '\ncurrent limit: ' + this._limit + '\ncurrent tuples: ' + this._tupleCount);
  var bucket = this._storage.get(index);
  console.log(this._storage.get(0));
  console.log(this._storage.get(1));
  console.log(this._storage.get(2));
  console.log(this._storage.get(3));
  console.log(this._storage.get(4));
  console.log(this._storage.get(5));
  console.log(this._storage.get(6));
  console.log(this._storage.get(7));
  console.log(this._storage.get(8));
  console.log(this._storage.get(9));
  console.log(this._storage.get(10));
  console.log(this._storage.get(11));
  console.log(this._storage.get(12));
  console.log(this._storage.get(13));
  console.log(this._storage.get(14));
  console.log(this._storage.get(15));
  // debugger;
  bucket.forEach(function(tuple, idx) {
    if (tuple[0] === k) {
      bucket.splice(idx, 1);
      this._tupleCount--;
    }
  });

  this.resize();
};

HashTable.prototype.resize = function() {
  var tempStorage;
  //make it bigger
  if (this._tupleCount / this._limit >= 0.75) {
    // alert('growing to' + this._limit * 2);
    // this._resizing = true;
    var newLimit = this._limit *= 2;
    tempStorage = LimitedArray(newLimit); 
    this._storage.each(function(bucket) {
      // console.log(bucket);
      debugger;
      _.each(bucket, function(tuple) {
        var idx = getIndexBelowMaxForKey(tuple[0], newLimit);
        // console.log(bucket);
        // console.log(tuple);
        // console.log(getIndexBelowMaxForKey(tuple[0], newLimit));
        tempStorage.set(idx, tuple);
        // console.log(tempStorage.get(idx));
        // hash = getIndexBelowMaxForKey(tuple[0], newLimit);
        // tempStorage[hash] = [tuple[0], tuple[1]];
      });
    });
    this._limit *= 2;
    this._storage = tempStorage;
  }
  // make it smaller 
  if (this._tupleCount / this._limit <= 0.25 && this.minLimit > this._limit / 2) {
    // alert('halving to ' + this._limit / 2);
    // this._resizing = true;
    this._limit /= 2;
    tempStorage = LimitedArray(this._limit);
    this._storage.each(function(bucket) {
      _.each(bucket, function(tuple) {
        tempStorage.set(getIndexBelowMaxForKey(tuple[0]), tuple[1]);
      });
    });
    this._storage = tempStorage;
  }
  // this._resizing = false;
};


/*
 * Complexity: What is the time complexity of the above functions?
 The overall HashTable is constant time, but contains certain elements that are linear in nature.
 The `insert` method is constant time.
 The `retrieve` method is linear.
 The `remove` method is linear.
 */

//var = 
