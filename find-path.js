/* 
We can think of the filesystem as a graph, we traverse the graph using a 
depth first search algorithm, which is efficient to find a particular value in a graph.
Start from the root vertex, which would be the root path of the filesystem
then using a recursive function and a queue to trace our steps,
we look for both files an reconstruct the path for each.
After that, we compare both paths and return a the closest path that contains both files.
*/

const assert = require('node:assert').strict;

function findParent(root, a, b) {
    const visited = [root];
    const queue = [root];
    const found = [];
    findPath(root, a, b, visited, queue, found);
    if (found.length === 2) {
        let counter = 0;
        while (counter < Math.min(found[0].length, found[1].length) - 1) {
            if (found[0][counter] === found[1][counter]) {
                counter++;
            } else {
                break;
            }
        }
        return found[0][counter - 1].name;
    }
}

function findPath(root, a, b, visited, queue, found) {
    while (queue.length > 0) {
        let current = root;
        for (const child of current.children) {
            if (visited.includes(child)) {
                continue;
            } else {
                queue.push(child);
                visited.push(child);
                if (child === a || child === b) {
                    found.push([...queue]);
                }
                return findPath(child, a, b, visited, queue, found);
            }
        }
        queue.pop();
        return findPath(queue[queue.length - 1], a, b, visited, queue, found);
    }
}

class File {
    constructor(name) {
        this.children = [];
        this.name = name;
    }

    addChild(file) {
        this.children.push(file);
    }
}

const root = new File('root');
const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o] = 'abcdefghijklmno'
    .split('')
    .map((char) => new File(char));

root.addChild(a);
root.addChild(b);
root.addChild(c);
a.addChild(d);
b.addChild(e);
b.addChild(f);
c.addChild(g);
c.addChild(h);
c.addChild(i);
d.addChild(j);
d.addChild(k);
f.addChild(l);
h.addChild(m);
i.addChild(n);
n.addChild(o);

assert.equal('b', findParent(root, e, l));
assert.equal('root', findParent(root, k, o));
assert.equal('c', findParent(root, g, i));
assert.equal('d', findParent(root, j, k));
