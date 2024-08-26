function findPath(graph, source, needle) {
    // Implement the algorithm to find the path from source to needle
    // graph: An object representing the weighted graph
    // source: The starting node
    // needle: The destination node
    // Return the path as an array of nodes
    let q = [graph[source]];
    let seen = [true];
    let prev = [-1];
    do {
        let curr = q.shift();
        for (let i in graph[curr]) {
            if(!graph[i]){
                continue;
            }
            if(!graph[i].length){
                continue;
            }
            q.push(i);
        }
        console.log(q);

    } while (q.length);
}

// Example graph
const graph = {
    A: [{ node: 'B', weight: 4 }, { node: 'C', weight: 2 }],
    B: [{ node: 'A', weight: 4 }, { node: 'E', weight: 3 }],
    C: [{ node: 'A', weight: 2 }, { node: 'D', weight: 2 }, { node: 'F', weight: 4 }],
    D: [{ node: 'C', weight: 2 }, { node: 'E', weight: 3 }, { node: 'F', weight: 1 }],
    E: [{ node: 'B', weight: 3 }, { node: 'D', weight: 3 }, { node: 'F', weight: 1 }],
    F: [{ node: 'C', weight: 4 }, { node: 'D', weight: 1 }, { node: 'E', weight: 1 }]
};

// Define source and needle (destination)
const source = 'A';
const needle = 'E';

// Call the function
findPath(graph, source, needle);
