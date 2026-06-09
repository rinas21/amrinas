---
title: Eulerian and Hamiltonian Graphs
---

# Eulerian and Hamiltonian Graphs

This document provides key differences, mathematical rules, and conditions for determining whether a graph is **Eulerian** or **Hamiltonian**.

---

## Mathematical Rules and Definitions

### Eulerian Graph
A graph is **Eulerian** if:
1. It contains an **Eulerian circuit**—a closed path that traverses every edge exactly once and returns to the starting vertex.
2. The graph must satisfy the following conditions:
   - The graph is **connected**, and
   - All vertices \( v \in V \) have an **even degree**:
     $$
     \text{deg}(v) \equiv 0 \ (\text{mod } 2) \ \forall v \in V
     $$
   - Or exactly two vertices have an **odd degree**:
     $$
     \text{deg}(v) \equiv 1 \ (\text{mod } 2)
     $$

---

### Hamiltonian Graph
A graph is **Hamiltonian** if:
1. It contains a **Hamiltonian cycle**—a closed path that visits every vertex exactly once and returns to the starting vertex.
2. For a simple graph \( G = (V, E) \) with \( |V| = n \) vertices:
   - Each vertex \( v \in V \) satisfies:
     $$
     \text{deg}(v) \geq \frac{n}{2}.
     $$

---

## Comparison Table

| **Aspect**            | **Eulerian Graph**                                            | **Hamiltonian Graph**                                      |
|------------------------|--------------------------------------------------------------|-----------------------------------------------------------|
| **Focus**             | Traverses every edge exactly once.                            | Visits every vertex exactly once.                         |
| **Condition**         | - All vertices have an even degree:                          | - Every vertex satisfies:                                 |
|                        | $ \text{deg}(v) \equiv 0 \ (\text{mod } 2) $               | $ \text{deg}(v) \geq \frac{n}{2} $                     |
|                        | - Or exactly two vertices have odd degrees:                  |                                                           |
|                        | $ \text{deg}(v) \equiv 1 \ (\text{mod } 2) $               |                                                           |
| **Path Type**         | Eulerian circuit (or Eulerian path if two odd vertices).      | Hamiltonian cycle.                                        |
| **Graph Connectivity**| Must be connected.                                            | Must be connected.                                         |
| **Examples**          | Königsberg Bridge Problem.                                    | Traveling Salesperson Problem (TSP).                      |

---

## Examples and Visualization

### Eulerian Graph
- Example of an Eulerian graph:
  - A connected graph where all vertices have even degrees:
    $$
    \text{deg}(A) = 2, \ \text{deg}(B) = 2, \ \text{deg}(C) = 2, \ \text{deg}(D) = 2
    $$
  - Alternatively, a graph with exactly two vertices of odd degrees:
    $$
    \text{deg}(A) = 3, \ \text{deg}(B) = 3, \ \text{deg}(C) = 2, \ \text{deg}(D) = 2
    $$

### Hamiltonian Graph
- Example of a Hamiltonian graph:
  - A simple graph where each vertex satisfies $ \text{deg}(v) \geq \frac{n}{2} $ for \( n = 6 \) vertices:
    $$
    \text{deg}(A) = 3, \ \text{deg}(B) = 3, \ \text{deg}(C) = 3, \ \text{deg}(D) = 3, \ \text{deg}(E) = 3, \ \text{deg}(F) = 3
    $$
