function findPath(graph, source, needle) {
    // Implement the algorithm to find the path from source to needle
    // graph: An object representing the weighted graph
    // source: The starting node
    // needle: The destination node
    // Return the path as an array of nodes
    let q = [graph[source]];
    // let seen = [false];
    let seen = {
        "A": false,
        "B": false,
        "C": false,
        "D": false,
        "E": false,
    };
    seen[source] = true;
    let prev = [source];
    do {
        let curr = q.shift();
        if (!curr.length) {
            continue;
        }
        for (let i in curr) {
            console.log("curr ", curr[i]);
            if (curr[i].node === needle) {
                prev.push(curr[i].node);
                // prev.push('e');
                break;
            }
            if (seen[curr[i].node]) {
                continue;
            }
            seen[curr[i].node] = true;
            prev.push(curr[i].node);
            console.log("pushing in q ", curr[i]);
            q.push(graph[curr[i].node]);
        }
        // console.log("prev last ",prev[prev.length-1]);
        if(prev[prev.length-1]===needle){
            break;
        }
    } while (q.length);
    console.log("prev ", prev);
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
