# 🚀 SLaNg Math Library - Complete Feature List & Explanations

## Table of Contents
1. [Core Features](#core-features)
2. [Advanced Calculus](#advanced-calculus)
3. [Multivariable Calculus](#multivariable-calculus)
4. [Geometry & Applications](#geometry--applications)
5. [Numerical Methods](#numerical-methods)
6. [Helper Utilities](#helper-utilities)

---

## Core Features

### 1. Expression Creation

#### Manual Creation
```javascript
const expr = {
    numi: {
        terms: [
            { coeff: 2, var: { x: 2 } },  // 2x²
            { coeff: 3, var: { x: 1 } },  // 3x
            { coeff: 1 }                   // 1
        ]
    },
    deno: 1
};
```

**Explanation**: This creates 2x² + 3x + 1. Each term has a coefficient and optional variables with powers.

#### Helper Functions (Easier!)
```javascript
import { polynomial } from './slang-helpers.js';

const expr = polynomial([2, 3, 1], 'x');  // Same thing, much easier!
```

**Why use helpers?**
- Less code to write
- Fewer errors
- More readable
- Easier to modify

### 2. Evaluation

```javascript
import { evaluateEquation } from './slang-math.js';

const value = evaluateEquation(expr, { x: 5 });
console.log(value);  // Computes 2(5²) + 3(5) + 1 = 66
```

**How it works**:
1. Substitutes x = 5 into each term
2. Computes each term: 2*25=50, 3*5=15, 1=1
3. Sums them: 50 + 15 + 1 = 66

**Use cases**:
- Plotting functions (evaluate at many points)
- Checking solutions
- Numerical verification

### 3. Differentiation

#### Basic Power Rule
```javascript
import { differentiateFraction } from './slang-math.js';

const f = polynomial([1, -4, 4], 'x');  // x² - 4x + 4
const fPrime = differentiateFraction(f[0][0], 'x');
// Result: 2x - 4
```

**How it works**:
- Applies power rule: d/dx(x^n) = n*x^(n-1)
- For each term, multiply coefficient by power, reduce power by 1
- Constants become 0

**Example**:
- x² → 2x¹ → 2x
- -4x → -4x⁰ → -4
- 4 → 0

#### Product Rule
```javascript
import { productRuleDifferentiate } from './slang-advanced.js';

const u = createFraction([createTerm(1, { x: 1 })], 1);  // x
const v = createFraction([createTerm(1, { x: 2 })], 1);  // x²

const result = productRuleDifferentiate([u, v], 'x');
// Computes: d/dx[x * x²] = x² + x*2x = 3x²
```

**Formula**: (uv)' = u'v + uv'

**Use cases**:
- When you have products of functions
- More complex expressions than simple polynomials

#### Quotient Rule
```javascript
import { quotientRuleDifferentiate } from './slang-advanced.js';

const numerator = createFraction([createTerm(1, { x: 1 })], 1);    // x
const denominator = createFraction([createTerm(1, { x: 2 })], 1);  // x²

const result = quotientRuleDifferentiate(numerator, denominator, 'x');
// Computes: d/dx[x/x²] = (x²*1 - x*2x)/x⁴ = -1/x²
```

**Formula**: (u/v)' = (u'v - uv')/v²

### 4. Integration

#### Indefinite Integration
```javascript
import { integrateFraction } from './slang-math.js';

const f = polynomial([2, 1], 'x');  // 2x + 1
const F = integrateFraction(f[0][0], 'x');
// Result: x² + x + C (constant omitted)
```

**How it works**:
- Reverse of differentiation
- Power rule: ∫x^n dx = x^(n+1)/(n+1)

**Example**:
- 2x → 2*x²/2 → x²
- 1 → x¹/1 → x

#### Definite Integration
```javascript
import { definiteIntegrateFraction } from './slang-math.js';

const f = polynomial([1], 'x');  // x
const result = definiteIntegrateFraction(f[0][0], 0, 2, 'x');
// Computes: ∫₀² x dx = [x²/2]₀² = 2 - 0 = 2
```

**Process**:
1. Integrate the function: x → x²/2
2. Evaluate at upper bound: (2)²/2 = 2
3. Evaluate at lower bound: (0)²/2 = 0
4. Subtract: 2 - 0 = 2

**Interpretation**: Area under y=x from x=0 to x=2

#### Double Integration
```javascript
const xy = createFraction([createTerm(1, { x: 1, y: 1 })], 1);

// Integrate with respect to y first
const step1 = definiteIntegrateFraction(xy, 0, 3, 'y');
// ∫₀³ xy dy = [xy²/2]₀³ = 9x/2

// Then with respect to x
const step2 = definiteIntegrateFraction(step1, 0, 2, 'x');
// ∫₀² 9x/2 dx = [9x²/4]₀² = 9
```

**Interpretation**: Volume under surface z=xy over rectangle [0,2]×[0,3]

### 5. Simplification

```javascript
import { simplifyFraction } from './slang-math.js';

const expr = {
    numi: {
        terms: [
            { coeff: 2, var: { x: 1 } },
            { coeff: 3, var: { x: 1 } },  // Same variable, same power
            { coeff: 1 }
        ]
    },
    deno: 1
};

const simplified = simplifyFraction(expr);
// Result: 5x + 1 (combined 2x + 3x)
```

**What it does**:
- Combines like terms (same variables with same powers)
- Removes zero terms
- Cleans up the expression

### 6. Expansion

```javascript
import { expandProduct } from './slang-math.js';

// (1 + x)(2 + y)
const factor1 = createFraction([createTerm(1), createTerm(1, {x:1})], 1);
const factor2 = createFraction([createTerm(2), createTerm(1, {y:1})], 1);

const expanded = expandProduct([factor1, factor2]);
// Result: 2 + y + 2x + xy
```

**How it works**:
- FOIL method: First, Outer, Inner, Last
- (1)(2) + (1)(y) + (x)(2) + (x)(y)
- 2 + y + 2x + xy

---

## Advanced Calculus

### 1. Taylor Series

```javascript
import { taylorSeries } from './slang-advanced.js';

const f = polynomial([1, 1], 'x');  // x + 1
const taylor = taylorSeries(f[0][0], 'x', 0, 5);
```

**What is Taylor Series?**
Approximates a function as a polynomial:
f(x) ≈ f(a) + f'(a)(x-a) + f''(a)(x-a)²/2! + ...

**Example**: e^x ≈ 1 + x + x²/2 + x³/6 + x⁴/24 + ...

**Use cases**:
- Approximating complex functions
- Numerical computation
- Understanding function behavior

### 2. Limits

```javascript
import { computeLimit } from './slang-advanced.js';

const f = createFraction([createTerm(1, {x:2}), createTerm(-4)], 1);
const limit = computeLimit(f, 'x', 2);
console.log(limit.value);  // 0
```

**What are limits?**
The value a function approaches as x approaches some value.

**Methods**:
1. Direct substitution (if it works)
2. Two-sided approach (from left and right)

**Why important?**
- Foundation of calculus
- Defines continuity
- Needed for derivatives

### 3. Critical Points

```javascript
import { findCriticalPoints } from './slang-advanced.js';

const f = polynomial([1, 0, -3, 0], 'x');  // x³ - 3x
const critical = findCriticalPoints(f[0][0], 'x', [-3, 3]);
console.log(critical.criticalPoints);  // Points where f'(x) = 0
```

**What are critical points?**
Points where the derivative equals zero (potential max/min).

**How it finds them**:
1. Computes f'(x)
2. Searches for where f'(x) = 0
3. Uses sign changes to detect roots
4. Refines with bisection method

**Use cases**:
- Finding maximum/minimum values
- Optimization problems
- Understanding function behavior

### 4. Second Derivative Test

```javascript
import { secondDerivativeTest } from './slang-advanced.js';

const f = polynomial([1, -4, 4], 'x');  // x² - 4x + 4
const test = secondDerivativeTest(f[0][0], 'x', 2);
console.log(test.type);  // "local minimum"
```

**How it works**:
- If f''(x) > 0: local minimum (concave up)
- If f''(x) < 0: local maximum (concave down)
- If f''(x) = 0: inconclusive (maybe inflection point)

**Intuition**:
- Concave up (∪) holds water → minimum
- Concave down (∩) spills water → maximum

### 5. Integration by Parts

```javascript
import { integrationByParts } from './slang-advanced.js';

const u = createFraction([createTerm(1, {x:1})], 1);   // x
const dv = createFraction([createTerm(1, {x:2})], 1);  // x²

const result = integrationByParts(u, dv, 'x');
// ∫ x*x² dx using ∫u dv = uv - ∫v du
```

**Formula**: ∫u dv = uv - ∫v du

**When to use**:
- Product of two different types of functions
- One part is easy to integrate
- Other part is easy to differentiate

**Example**: ∫x*e^x dx
- u = x (easy to differentiate)
- dv = e^x dx (easy to integrate)

---

## Multivariable Calculus

### 1. Partial Derivatives

```javascript
import { partialDerivative } from './slang-helpers.js';

const f = sum([
    [1, { x: 2, y: 1 }],  // x²y
    [2, { x: 1, y: 2 }]   // 2xy²
]);

const fx = partialDerivative(f[0][0], 'x');  // ∂f/∂x = 2xy + 2y²
const fy = partialDerivative(f[0][0], 'y');  // ∂f/∂y = x² + 4xy
```

**What is a partial derivative?**
Derivative with respect to one variable, treating others as constants.

**Example**: f(x,y) = x²y
- ∂f/∂x: Treat y as constant → 2xy
- ∂f/∂y: Treat x as constant → x²

**Use cases**:
- Multivariable optimization
- Heat equations
- Fluid dynamics
- Economics (marginal rates)

### 2. Gradient

```javascript
import { gradient } from './slang-advanced.js';

const f = sum([[1, {x:2}], [1, {y:2}]]);  // x² + y²
const grad = gradient(f[0][0], ['x', 'y']);
// ∇f = (2x, 2y)
```

**What is a gradient?**
Vector of all partial derivatives: ∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z, ...)

**Properties**:
- Points in direction of steepest increase
- Perpendicular to level curves
- Magnitude shows rate of increase

**Example**: For a hill z = f(x,y), ∇f points uphill.

### 3. Directional Derivative

```javascript
import { directionalDerivative } from './slang-advanced.js';

const f = sum([[1, {x:2}], [1, {y:2}]]);
const point = { x: 1, y: 1 };
const direction = { x: 1, y: 0 };  // East

const Dvf = directionalDerivative(f[0][0], ['x', 'y'], point, direction);
// Rate of change moving east from (1,1)
```

**Formula**: D_v f = ∇f · v

**Interpretation**:
- How fast does f change if you walk in direction v?
- At (1,1) on a hill, how steep is it if you walk east?

### 4. Double/Triple Integrals

```javascript
import { integralValue } from './slang-helpers.js';

const f = createFraction([createTerm(1, {x:1, y:1})], 1);
const volume = integralValue(f, { x: [0, 2], y: [0, 3] });
// ∫₀² ∫₀³ xy dy dx = 9
```

**Interpretation**:
- Volume under surface z = f(x,y)
- Over rectangular region R

**Process**:
1. Integrate with respect to y (innermost)
2. Result is a function of x only
3. Integrate with respect to x
4. Get final number (volume)

---

## Geometry & Applications

### 1. Arc Length

```javascript
import { arcLength } from './slang-advanced.js';

const f = polynomial([1, 0], 'x');  // y = x
const L = arcLength(f[0][0], 'x', 0, 1, 1000);
// Length of line from (0,0) to (1,1)
```

**Formula**: L = ∫ₐᵇ √(1 + (dy/dx)²) dx

**Why √(1 + (dy/dx)²)?**
- Pythagorean theorem on tiny segments
- ds = √(dx² + dy²) = √(1 + (dy/dx)²) dx

**Use cases**:
- Length of curves
- Perimeter of shapes
- Distance traveled

### 2. Surface Area of Revolution

```javascript
import { surfaceAreaOfRevolution } from './slang-advanced.js';

const f = polynomial([1, 0], 'x');  // y = x
const SA = surfaceAreaOfRevolution(f[0][0], 'x', 0, 1);
// Surface area of cone formed by rotating y=x
```

**Formula**: SA = 2π ∫ₐᵇ y√(1 + (dy/dx)²) dx

**Visualization**:
- Take curve y = f(x)
- Rotate around x-axis
- Creates a 3D surface
- Compute its area

**Example**: Rotating y=R (constant) creates a cylinder.

### 3. Volume Under Surface

```javascript
import { volumeUnderSurface } from './slang-helpers.js';

const f = sum([[1, {x:2}], [1, {y:2}]]);  // z = x² + y²
const V = volumeUnderSurface(f[0][0], [0, 1], [0, 1]);
// Volume under paraboloid over unit square
```

**Interpretation**:
- Imagine surface z = f(x,y) as a tent
- Region R in xy-plane as the base
- Volume is the space under the tent

---

## Numerical Methods

### Why Numerical Methods?

Many problems can't be solved symbolically:
- √(1 + x²) can't be integrated in closed form
- Polynomial roots beyond degree 4 need numerical methods
- Most real-world functions are too complex

### 1. Numerical Integration

```javascript
// Library uses Riemann sums internally
const step = (b - a) / numSteps;
for (let i = 0; i < numSteps; i++) {
    const x = a + i * step;
    sum += f(x) * step;
}
```

**How it works**:
- Divide interval into small rectangles
- Sum up areas of rectangles
- More rectangles = better approximation

**Trade-off**:
- More steps = more accurate
- More steps = slower computation

### 2. Root Finding (Bisection)

```javascript
// Used in findCriticalPoints
while (right - left > tolerance) {
    mid = (left + right) / 2;
    if (f(mid) * f(left) < 0) {
        right = mid;
    } else {
        left = mid;
    }
}
```

**How it works**:
1. Start with interval [a, b] where f(a) and f(b) have opposite signs
2. Check midpoint
3. Root must be in half where sign changes
4. Repeat on that half

**Guarantee**: Always converges for continuous functions.

---

## Helper Utilities

### 1. Polynomial Builder

```javascript
polynomial([1, -2, 1], 'x')  // x² - 2x + 1
```

**Saves you from**:
```javascript
{
    numi: {
        terms: [
            { coeff: 1, var: { x: 2 } },
            { coeff: -2, var: { x: 1 } },
            { coeff: 1 }
        ]
    },
    deno: 1
}
```

### 2. Sum Builder

```javascript
sum([
    [3, { x: 2 }],
    [-2, { x: 1 }],
    [1, {}]
])  // 3x² - 2x + 1
```

### 3. Integration Helper

```javascript
integralValue(expr, { x: [0, 1], y: [0, 2] })
// Does integration and evaluation in one call
```

**Instead of**:
```javascript
const step1 = definiteIntegrateFraction(expr, 0, 1, 'x');
const step2 = definiteIntegrateFraction(step1, 0, 2, 'y');
const result = evaluateEquation([[step2]], {});
```

---

## Real-World Applications

### 1. Physics: Projectile Motion

```javascript
const h = polynomial([-4.9, 20, 2], 't');  // h(t) = -4.9t² + 20t + 2
const { criticalPoints } = findCriticalPoints(h[0][0], 't');
// Find when ball reaches maximum height
```

### 2. Economics: Profit Maximization

```javascript
const P = polynomial([-1, 100, -500], 'x');  // P(x) = -x² + 100x - 500
const { criticalPoints } = findCriticalPoints(P[0][0], 'x');
// Find production level that maximizes profit
```

### 3. Engineering: Optimization

```javascript
const A = polynomial([-1, 50], 'x');  // A(x) = 50x - x²
const { criticalPoints } = findCriticalPoints(A[0][0], 'x');
// Find dimensions for maximum area given perimeter
```

---

## Summary

The SLaNg Math Library provides:

**✓ Symbolic manipulation** - Not just numbers, but actual formulas
**✓ Exact computation** - When possible (e.g., ∫x² dx = x³/3 exactly)
**✓ Numerical methods** - When symbolic fails (e.g., arc length)
**✓ Multivariable calculus** - Real-world problems have multiple variables
**✓ Optimization** - Find best solutions
**✓ Geometry** - Compute areas, volumes, lengths

**Start simple, build up gradually!**