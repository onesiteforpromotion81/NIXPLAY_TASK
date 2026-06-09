class Node {
    constructor(key, value, expireAt = null) {
      this.key = key;
      this.value = value;
      this.expireAt = expireAt;
      this.prev = null;
      this.next = null;
    }
  
    isExpired() {
      return this.expireAt !== null && Date.now() > this.expireAt;
    }
}

class LRUCache {
    constructor(capacity) {
      if (!Number.isInteger(capacity) || capacity < 0) {
        throw new RangeError('Capacity must be a non-negative integer.');
      }
  
      this.capacity = capacity;
      this.map = new Map(); 
      this.head = new Node(null, null);
      this.tail = new Node(null, null);
      this.head.next = this.tail;
      this.tail.prev = this.head;
      this.size = 0;
    }
  
    _moveToFront(node) {
      this._removeNode(node);
      this._addNodeAfter(this.head, node);
    }
  
    _addNodeAfter(prevNode, newNode) {
      const nextNode = prevNode.next;
      prevNode.next = newNode;
      newNode.prev = prevNode;
      newNode.next = nextNode;
      nextNode.prev = newNode;
    }
  
    _removeNode(node) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
      node.prev = null;
      node.next = null;
    }
  
    _evictLRU() {
      if (this.size === 0) return;
      const lru = this.tail.prev;
      this._removeNode(lru);
      this.map.delete(lru.key);
      this.size--;
    }
  
    get(key) {
      const node = this.map.get(key);
      if (!node) return -1;
  
      if (node.isExpired()) {
        this._removeNode(node);
        this.map.delete(key);
        this.size--;
        return -1;
      }
  
      this._moveToFront(node);
      return node.value;
    }
  
    put(key, value, ttl = null) {
      if (ttl !== null && (!Number.isFinite(ttl) || ttl < 0)) {
        throw new RangeError('TTL must be a non-negative number or null.');
      }
  
      let node = this.map.get(key);
  
      const expireAt = ttl !== null ? Date.now() + ttl : null;
  
      if (node) {
        node.value = value;
        node.expireAt = expireAt;
        this._moveToFront(node);
      } else {
        if (this.size >= this.capacity && this.capacity > 0) {
          this._evictLRU();
        }
  
        if (this.capacity === 0) return;
  
        node = new Node(key, value, expireAt);
        this._addNodeAfter(this.head, node);
        this.map.set(key, node);
        this.size++;
      }
    }
}

module.exports = LRUCache;