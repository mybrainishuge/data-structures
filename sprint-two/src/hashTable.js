var HashTable = function() {
  this._limit = 8;
  this._tupleCount = 0;
  this._storage = LimitedArray(this._limit);
  this.minLimit = 8; //this allows for adjustment of the minimum size of our hash table
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
    this.resize();
  }
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
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  var removed;

  bucket.forEach(function(tuple, idx) {
    if (tuple[0] === k) {
      removed = bucket[idx];
      bucket.splice(idx, 1);
      this._tupleCount--;
    }
  });

  if (!bucket.length) {
    this._tupleCount--;
    this.resize();
  }
  return removed;
};

HashTable.prototype.resize = function() {
  var removed = [];
  var context = this;
  //make it bigger
  // debugger;
  if (this._tupleCount / this._limit >= 0.75) {
    this._storage.each(function(bucket) {
      _.each(bucket, function(tuple) {
        removed.push(context.remove(tuple[0]));
      });
    });
    this._limit *= 2;
    this._storage = LimitedArray(this._limit);
    
    _.each(removed, function(tuple) {
      context.insert(tuple[0], tuple[1]);
    });
  }
  // make it smaller 
  if (this._tupleCount / this._limit <= 0.25 && (this.minLimit > 8)) {
    this._storage.each(function(bucket) {
      _.each(bucket, function(tuple) {
        removed.push(context.remove(tuple[0]));
      });
    });
    debugger;
    this._limit /= 2;
    this._storage = LimitedArray(this._limit);
    _.each(removed, function(tuple) {
      context.insert(tuple[0], tuple[1]);
    });
  }
};


/*
 * Complexity: What is the time complexity of the above functions?
 The overall HashTable is constant time, but contains certain elements that are linear in nature.
 The `insert` method is constant time.
 The `retrieve` method is linear.
 The `remove` method is linear.
 */

//var = 
