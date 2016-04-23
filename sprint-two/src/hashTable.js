var HashTable = function() {
  this._limit = 8;
  this._bucketCount = 0;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  if (Array.isArray(bucket)) {
    bucket.push([k, v]);
  } else {
    this._storage.set(index, [[k, v]]);
    this._bucketCount++;
    //this.resize();
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
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
      removed = bucket.splice(idx, 1);
    }
  });
  if (!bucket.length) {
    this._bucketCount--;
    //this.resize();
  }
  return removed;
};

Hashtable.prototype.resize = function(max) {
  if (this._bucketCount / this._limit >= 0.75) {
    this._limit *= 2;
    this._storage.each(function(bucket) {
      _.each(bucket, function(tuple) {
        // .insert([tuple[0], tuple[1]]);
      });
    });
  }
  if (this._bucketCount / this._limit <= 0.25) {
    this._limit /= 2;
  }
};


/*
 * Complexity: What is the time complexity of the above functions?
 The overall HashTable is constant time, but contains certain elements that are linear in nature.
 The `insert` method is constant time.
 The `retrieve` method is linear.
 The `remove` method is linear.
 */

