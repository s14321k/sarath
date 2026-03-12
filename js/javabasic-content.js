// Javabasic - Content Data
const javabasicContentData = `<h1 id="java-interview-question-bank">Java Interview Question Bank</h1>
<ul>
<li><a href="https://www.java2novice.com/java-interview-questions/">Java Interview Questions 1</a></li>
<li><a href="https://www.java67.com/2015/03/top-40-core-java-interview-questions-answers-telephonic-round.html">Java Interview Questions 2</a></li>
<li><a href="https://www.javamadesoeasy.com/">Java Go through Points</a></li>
</ul>
<hr>
<h1 id="java-principles-best-practices-memory-management">Java Principles &amp; Best Practices , Memory Management</h1>
<details>
<summary><strong>Java Principles & Best Practices</strong></summary>
<p><img src="../images/JavaBasic/solid.jpg" alt="SOLID"></p>
<details>
<summary>1. Single Responsibility Principle (SRP)</summary>
<p>A class should have <strong>only one reason to change</strong>.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
class User {
    void saveToDatabase() {}
    void printUserDetails() {}
}
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
class User {}
class UserRepository {
    void save(User user) {}
}
class UserPrinter {
    void print(User user) {}
}
</code></pre>
</details>
<hr>
<details>
<summary>2. Open/Closed Principle (OCP)</summary>
<p>Classes should be <strong>open for extension, but closed for modification</strong>.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
class Discount {
    double getDiscount(String type) {
        if (type.equals(&quot;STUDENT&quot;)) return 0.2;
        if (type.equals(&quot;SENIOR&quot;)) return 0.3;
        return 0;
    }
}
</code></pre>
<p><strong>Good Example (using polymorphism):</strong></p>
<pre><code class="language-java">
interface Discount {
    double getDiscount();
}

class StudentDiscount implements Discount {
    public double getDiscount() { return 0.2; }
}

class SeniorDiscount implements Discount {
    public double getDiscount() { return 0.3; }
}
</code></pre>
</details>
<hr>
<details>
<summary>3. Liskov Substitution Principle (LSP)</summary>
<p>Subtypes must be <strong>replaceable</strong> with their base types without breaking the program.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
class Bird {
    void fly() {}
}
class Ostrich extends Bird {  // Ostrich can&#x27;t fly
    void fly() { throw new UnsupportedOperationException(); }
}
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
interface Bird {}
interface Flyable extends Bird { void fly(); }

class Sparrow implements Flyable {
    public void fly() { System.out.println(&quot;Flying&quot;); }
}

class Ostrich implements Bird {}
</code></pre>
</details>
<hr>
<details>
<summary>4. Interface Segregation Principle (ISP)</summary>
<p>Clients should not be forced to implement <strong>unnecessary methods</strong>.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
interface Worker {
    void work();
    void eat();
}

class Robot implements Worker {
    public void work() {}
    public void eat() {} // Not applicable
}
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
interface Workable { void work(); }
interface Eatable { void eat(); }

class Robot implements Workable {
    public void work() {}
}
</code></pre>
</details>
<hr>
<details>
<summary>5. Dependency Inversion Principle (DIP)</summary>
<p>Depend on <strong>abstractions</strong>, not on concrete implementations.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
class MySQLDatabase {
    void connect() {}
}

class App {
    MySQLDatabase db = new MySQLDatabase();
}
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
interface Database { void connect(); }

class MySQLDatabase implements Database {
    public void connect() {}
}

class App {
    private Database db;
    App(Database db) { this.db = db; }
}
</code></pre>
</details>
<hr>
<details>
<summary>6. DRY (Don’t Repeat Yourself)</summary>
<p>Avoid duplicating logic. Extract common behavior into methods/classes.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
int areaSquare(int side) { return side * side; }
int areaRectangle(int length, int width) { return length * width; }
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
class ShapeUtils {
    static int area(int a, int b) { return a * b; }
}
</code></pre>
</details>
<hr>
<details>
<summary>7. KISS (Keep It Simple, Stupid)</summary>
<p>Prefer <strong>simple and clear solutions</strong> over clever but complex ones.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
int add(int a, int b) {
    return (a | b) + (a &amp; b); // Bitwise trick
}
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
int add(int a, int b) {
    return a + b;
}
</code></pre>
</details>
<hr>
<details>
<summary>8. YAGNI (You Aren’t Gonna Need It)</summary>
<p>Don’t write code for future needs that may never come.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
class Car {
    void fly() {}  // Not needed now
}
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
class Car {
    void drive() {}
}
</code></pre>
</details>
<hr>
<details>
<summary>9. Validate Before Use</summary>
<p>Always <strong>validate inputs</strong> before using them to avoid crashes and bugs.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
int divide(int a, int b) {
    return a / b;  // Risk of divide by zero
}
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
int divide(int a, int b) {
    if (b == 0) throw new IllegalArgumentException(&quot;Divider cannot be zero&quot;);
    return a / b;
}
</code></pre>
</details>
<hr>
<details>
<summary>10. Favor Composition Over Inheritance</summary>
<p>Use <strong>composition</strong> instead of inheritance when possible.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
class Engine {}
class Car extends Engine {}  // Wrong: Car is not an Engine
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
class Engine {}
class Car {
    private Engine engine;
    Car(Engine engine) { this.engine = engine; }
}
</code></pre>
</details>
<hr>
<details>
<summary>11. Law of Demeter (LoD)</summary>
<p>An object should only talk to its <strong>direct friends</strong>, not strangers.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
order.getCustomer().getAddress().getCity();
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
class Order {
    Customer customer;
    String getCustomerCity() {
        return customer.getCity();
    }
}
order.getCustomerCity();
</code></pre>
</details>
<hr>
<details>
<summary>12. Fail Fast Principle</summary>
<p>Detect and report errors <strong>early</strong>, instead of failing silently.</p>
<p><strong>Usage Example:</strong></p>
<pre><code class="language-java">
if (list == null) throw new IllegalArgumentException(&quot;List cannot be null&quot;);
</code></pre>
</details>
<hr>
<h2 id="java-memory-management-principles">Java Memory Management Principles</h2>
<details>
<summary>1. Avoid Creating Unnecessary Objects</summary>
<p>Unnecessary objects increase memory usage and GC pressure.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
String s1 = new String(&quot;Hello&quot;); // Creates unnecessary object
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
String s1 = &quot;Hello&quot;; // Uses string pool
</code></pre>
</details>
<hr>
<details>
<summary>2. Prefer Immutability</summary>
<p>Immutable objects are thread-safe and reduce errors.</p>
<p><strong>Usage Example:</strong></p>
<pre><code class="language-java">
final class Person {
    private final String name;
    Person(String name) { this.name = name; }
    String getName() { return name; }
}
</code></pre>
<p>Immutable objects also reduce chances of memory leaks caused by unintended modifications.</p>
</details>
<hr>
<details>
<summary>3. Use Primitive Types Instead of Wrappers (when possible)</summary>
<p>Wrappers (<code>Integer</code>, <code>Double</code>) consume more memory than primitives (<code>int</code>, <code>double</code>).</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
Integer sum = 0;
for (Integer i = 0; i &lt; 1000; i++) {
    sum += i;
}
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
int sum = 0;
for (int i = 0; i &lt; 1000; i++) {
    sum += i;
}
</code></pre>
</details>
<hr>
<details>
<summary>4. Reuse Objects When Possible</summary>
<p>For heavy objects, reuse instances instead of creating new ones repeatedly.</p>
<p><strong>Usage Example:</strong></p>
<pre><code class="language-java">
// Reuse Random instead of creating in every method call
private static final Random random = new Random();
</code></pre>
</details>
<hr>
<details>
<summary>5. Be Careful with Static References</summary>
<p>Static references live until the class is unloaded and may cause <strong>memory leaks</strong>.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
static List&lt;String&gt; cache = new ArrayList&lt;&gt;();
</code></pre>
<p><strong>Good Example:</strong></p>
<ul>
<li>Use weak references (<code>WeakHashMap</code>) if cache entries can be discarded.</li>
<li>Clean up static fields when not needed.</li>
</ul>
</details>
<hr>
<details>
<summary>6. Close Resources Properly</summary>
<p>Unclosed resources (files, sockets, DB connections) leak memory.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
FileInputStream fis = new FileInputStream(&quot;data.txt&quot;);
</code></pre>
<p><strong>Good Example (try-with-resources):</strong></p>
<pre><code class="language-java">
try (FileInputStream fis = new FileInputStream(&quot;data.txt&quot;)) {
    // use fis
}
</code></pre>
</details>
<hr>
<details>
<summary>7. Use StringBuilder/StringBuffer for Concatenation in Loops</summary>
<p>String concatenation in loops creates multiple intermediate objects.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
String result = &quot;&quot;;
for (int i = 0; i &lt; 100; i++) {
    result += i;
}
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
StringBuilder sb = new StringBuilder();
for (int i = 0; i &lt; 100; i++) {
    sb.append(i);
}
String result = sb.toString();
</code></pre>
</details>
<hr>
<details>
<summary>8. Avoid Memory Leaks with Collections</summary>
<p>Collections can hold references long after they are needed.</p>
<p><strong>Bad Example:</strong></p>
<pre><code class="language-java">
List&lt;byte[]&gt; list = new ArrayList&lt;&gt;();
while (true) {
    list.add(new byte[1024]); // OutOfMemoryError
}
</code></pre>
<p><strong>Good Example:</strong></p>
<pre><code class="language-java">
list.clear(); // Release references when no longer needed
</code></pre>
<p>Or use <code>WeakHashMap</code> when keys should be garbage collected.</p>
</details>
<hr>
<details>
<summary>9. Use Object Pooling Carefully</summary>
<ul>
<li>For lightweight objects, let GC handle them.</li>
<li>For expensive resources (DB connections, threads), use pooling (<code>ExecutorService</code>, connection pools).</li>
</ul>
<p><strong>Usage Example:</strong></p>
<pre><code class="language-java">
ExecutorService executor = Executors.newFixedThreadPool(5);
</code></pre>
</details>
<hr>
<details>
<summary>10. Monitor and Tune Garbage Collection</summary>
<ul>
<li>Use JVM options to optimize GC (<code>-Xms</code>, <code>-Xmx</code>, <code>-XX:+UseG1GC</code>).</li>
<li>Monitor memory with tools like <strong>VisualVM, JConsole, Flight Recorder</strong>.</li>
</ul>
<p><strong>Usage:</strong></p>
<pre><code class="language-bash">
java -Xms512m -Xmx1024m -XX:+UseG1GC MyApp
</code></pre>
</details>
<hr>
<details>
<summary>11. Weak References for Caching</summary>
<p>Use <code>WeakReference</code> or <code>WeakHashMap</code> for objects that can be garbage collected.</p>
<p><strong>Usage Example:</strong></p>
<pre><code class="language-java">
Map&lt;Object, String&gt; cache = new WeakHashMap&lt;&gt;();
</code></pre>
</details>
<hr>
<details>
<summary>12. Prefer Local Variables Over Instance Variables</summary>
<p>Local variables are eligible for GC as soon as the method exits, while instance variables may remain longer.</p>
<p><strong>Usage Example:</strong></p>
<pre><code class="language-java">
public int compute() {
    int temp = 100;  // released quickly
    return temp * 2;
}
</code></pre>
</details>
</details>
<hr>
<h1 id="primary-main-features-of-java">🚀 Primary Main Features of Java</h1>
<details>
<summary>Java main features</summary>
<ul>
<li>Platform Independent  </li>
<li>Object Oriented Programming Language  </li>
<li>Abstraction  </li>
<li>Encapsulation  </li>
<li>Inheritance  </li>
<li>Polymorphism  </li>
<li>Simple  </li>
<li>Robust  </li>
<li>Secure  </li>
<li>Distributed  </li>
<li>Multithreading  </li>
<li>Portable  </li>
</ul>
<h3 id="javas-main-features-with-examples">Java&#x27;s Main Features (with Examples)</h3>
<ul>
<li><strong>Platform Independent</strong></li>
<li>Write once, run anywhere. Java code compiles to bytecode, which runs on any OS with a JVM.</li>
<li><em>Example:</em></li>
</ul>
<pre><code class="language-java">
// Compile on Windows, run on Linux
javac Hello.java
java Hello
</code></pre>
<ul>
<li><strong>Object-Oriented</strong></li>
<li>Uses classes and objects. Supports Abstraction, Encapsulation, Inheritance, and Polymorphism.</li>
<li><em>Example:</em></li>
</ul>
<pre><code class="language-java">
class Dog { void bark() { System.out.println(&quot;Woof&quot;); } }
</code></pre>
<ul>
<li><strong>Simple</strong></li>
<li>Easy syntax, no pointers, automatic memory management.</li>
<li><em>Example:</em></li>
</ul>
<pre><code class="language-java">
int x = 5; // No pointer arithmetic
</code></pre>
<ul>
<li><strong>Robust</strong></li>
<li>Strong memory management, exception handling, type checking.</li>
<li><em>Example:</em></li>
</ul>
<pre><code class="language-java">
try { int a = 5/0; } catch(Exception e) { System.out.println(&quot;Error&quot;); }
</code></pre>
<ul>
<li><strong>Secure</strong></li>
<li>No explicit pointer, runs in JVM sandbox, bytecode verification.</li>
<li><em>Example:</em></li>
</ul>
<p>     // Applets run in restricted environment</p>
<ul>
<li><strong>Distributed</strong></li>
<li>Supports networking, RMI, and web applications.</li>
<li><em>Example:</em></li>
</ul>
<pre><code class="language-java">
import java.net.*;
Socket s = new Socket(&quot;localhost&quot;, 8080);
</code></pre>
<ul>
<li><strong>Multithreaded</strong></li>
<li>Can run multiple threads (tasks) at once.</li>
<li><em>Example:</em></li>
</ul>
<pre><code class="language-java">
new Thread(() -&gt; System.out.println(&quot;Hello from thread&quot;)).start();
</code></pre>
<ul>
<li><strong>Portable</strong></li>
<li>Java programs run the same on any platform with JVM.</li>
<li><em>Example:</em></li>
</ul>
<p>     // Bytecode runs on Windows, Mac, Linux</p>
</details>
<hr>
<h2 id="class-loaders-in-java">🧩 Class Loaders in Java</h2>
<details>
<summary>Class Loaders explanation</summary>
<h3 id="1-bootstrap-class-loader">1. Bootstrap Class Loader</h3>
<h3 id="2-extension-class-loader">2. Extension Class Loader</h3>
<h3 id="3-systemapplication-class-loader">3. System/Application Class Loader</h3>
<h3 id="java-class-loaders-simple-clear">Java Class Loaders (Simple &amp; Clear)</h3>
<p>Java uses class loaders to load classes into memory in a specific order:</p>
<ul>
<li><strong>Bootstrap Class Loader</strong></li>
<li>Loads core Java classes (like <code>java.lang.*</code>).</li>
<li>Built into JVM, not accessible in Java code.</li>
<li><em>Example:</em> Loads <code>String.class</code> from the JDK.</li>
</ul>
<ul>
<li><strong>Extension (Platform) Class Loader</strong></li>
<li>Loads classes from extension directories (e.g., <code>JAVA_HOME/lib/ext</code>).</li>
<li><em>Example:</em> Loads optional Java libraries.</li>
</ul>
<ul>
<li><strong>System (Application) Class Loader</strong></li>
<li>Loads classes from your application&#x27;s classpath.</li>
<li><em>Example:</em> Loads your own classes: <code>com.myapp.Main</code>.</li>
</ul>
<p><strong>Hierarchy:</strong></p>
<pre><code class="language-">
Bootstrap
   ↓
Extension
   ↓
System (Application)
</code></pre>
<p><strong>Code Example:</strong></p>
<pre><code class="language-java">
ClassLoader cl = MyClass.class.getClassLoader();
System.out.println(cl); // Usually prints &#x27;sun.misc.Launcher$AppClassLoader&#x27;
</code></pre>
<hr>
</details>
<hr>
<h1 id="identifiers-in-java">🆔 Identifiers in Java</h1>
<details>
<summary>Java Identifiers and Keywords</summary>
<ul>
<li>Identifiers start with alphabets, underscore <code>_</code>, or dollar <code>$</code>.</li>
<li>Case sensitive.</li>
<li><strong>Keywords cannot be used as identifiers</strong>.</li>
</ul>
<h3 id="some-java-keywords">Some Java Keywords</h3>
<table>
<thead><tr>
<th>Keyword</th>
<th>Usage</th>
</tr></thead><tbody>
<tr>
<td><code>class</code></td>
<td>Declare a class</td>
</tr>
<tr>
<td><code>public</code></td>
<td>Accessibility modifier</td>
</tr>
<tr>
<td><code>static</code></td>
<td>Belongs to class rather than instance</td>
</tr>
<tr>
<td><code>void</code></td>
<td>Method returns nothing</td>
</tr>
<tr>
<td><code>main</code></td>
<td>Entry point of Java program</td>
</tr>
<tr>
<td><code>new</code></td>
<td>Create new object</td>
</tr>
<tr>
<td><code>if</code>, <code>else</code></td>
<td>Conditional statements</td>
</tr>
<tr>
<td><code>for</code>, <code>while</code>, <code>do</code></td>
<td>Loop constructs</td>
</tr>
<tr>
<td><code>return</code></td>
<td>Exit method and optionally return value</td>
</tr>
<tr>
<td><code>try</code>, <code>catch</code>, <code>finally</code></td>
<td>Exception handling blocks</td>
</tr>
<tr>
<td><code>throw</code>, <code>throws</code></td>
<td>Exception declaration and throwing</td>
</tr>
</tbody></table>
<h3 id="java-identifiers-short-simple">Java Identifiers (Short &amp; Simple)</h3>
<p><strong>Identifiers</strong> are names for variables, methods, classes, etc.</p>
<p><strong>Rules:</strong></p>
<ul>
<li>Must start with a letter (A-Z, a-z), underscore <code>_</code>, or dollar sign <code>$</code>.</li>
<li>Can contain digits (0-9) after the first character.</li>
<li>Case sensitive (<code>MyVar</code> ≠ <code>myvar</code>).</li>
<li>Cannot use Java keywords (like <code>class</code>, <code>int</code>).</li>
</ul>
<p><strong>Examples:</strong></p>
<pre><code class="language-java">
int age;
String _name;
double $salary;
// int 2ndValue; // Invalid: cannot start with digit
// int class;    // Invalid: &#x27;class&#x27; is a keyword
</code></pre>
<p><strong>Common Java Keywords:</strong></p>
<p><code>class</code>, <code>public</code>, <code>static</code>, <code>void</code>, <code>if</code>, <code>else</code>, <code>for</code>, <code>while</code>, <code>return</code>, <code>try</code>, <code>catch</code>, <code>throw</code>, <code>throws</code></p>
</details>
<hr>
<details>
<summary>Variables in Java</summary>
<ul>
<li><strong>Local:</strong> Inside method body; cannot be <code>static</code>.</li>
<li><strong>Instance:</strong> Inside class body; each object has its own copy.</li>
<li><strong>Static:</strong> Shared across all instances; memory allocated once when class loads.</li>
</ul>
</details>
<hr>
<h2 id="what-is-a-class">🏷️ What is a Class?</h2>
<p>A <strong>class</strong> is a blueprint or template from which objects are created. It contains data (fields) and behaviors (methods).</p>
<hr>
<h2 id="common-types-of-classes-in-java">🏗️ Common Types of Classes in Java</h2>
<details>
<summary>Common Java Class Types</summary>
<h3 id="1-regular-concrete-class">1. Regular (Concrete) Class</h3>
<ul>
<li>Can be instantiated to create objects.</li>
<li>Contains fields, methods, constructors.</li>
</ul>
<pre><code class="language-java">
public class Car {
    // Fields, methods, constructors
}
</code></pre>
<h3 id="2-abstract-class">2. Abstract Class</h3>
<ul>
<li>Cannot be instantiated.</li>
<li>May contain abstract methods to be implemented by subclasses.</li>
</ul>
<pre><code class="language-java">
public abstract class Shape {
    // Abstract and regular methods
}
</code></pre>
<h3 id="3-interface">3. Interface</h3>
<ul>
<li>Collection of abstract methods (before Java 8).</li>
<li>From Java 8, can have default method implementations.</li>
</ul>
<pre><code class="language-java">
public interface Drawable {
    void draw(); // implicitly public and abstract
}
</code></pre>
<h3 id="4-final-class">4. Final Class</h3>
<ul>
<li>Cannot be extended (subclassed).</li>
</ul>
<pre><code class="language-java">
public final class UtilityClass {
    // Methods and fields
}
</code></pre>
<h3 id="5-inner-class">5. Inner Class</h3>
<ul>
<li>Defined inside another class.</li>
<li>Can be static or non-static.</li>
</ul>
<pre><code class="language-java">
public class Outer {
    class Inner {
        // Inner class
    }
}
</code></pre>
<h3 id="6-static-nested-class">6. Static Nested Class</h3>
<ul>
<li>Static class inside another class.</li>
<li>Cannot access instance variables of outer class.</li>
</ul>
<pre><code class="language-java">
public class Outer {
    static class Nested {
        // Static nested class
    }
}
</code></pre>
<h3 id="7-anonymous-class">7. Anonymous Class</h3>
<ul>
<li>Local class without a name.</li>
<li>Usually used to instantiate interfaces or extend classes once.</li>
</ul>
<pre><code class="language-java">
Runnable myRunnable = new Runnable() {
    public void run() {
        // Implementation
    }
};
</code></pre>
</details>
<hr>
<h2 id="example-of-anonymous-class">🧩 Example of Anonymous Class</h2>
<pre><code class="language-java">
class Polygon {
    public void display() {
        System.out.println(&quot;Inside the Polygon class&quot;);
    }
}

class AnonymousDemo {
    public void createClass() {
        // Anonymous class extending Polygon
        Polygon p1 = new Polygon() {
            public void display() {
                System.out.println(&quot;Inside an anonymous class.&quot;);
            }
        };
        p1.display();
    }
}

class Main {
    public static void main(String[] args) {
        AnonymousDemo an = new AnonymousDemo();
        an.createClass();
    }
}
</code></pre>
<p><strong>Output:</strong></p>
<p><code>Inside an anonymous class.</code></p>
<hr>
<h2 id="common-java-terms">📚 Common Java Terms</h2>
<table>
<thead><tr>
<th>Term</th>
<th>Explanation</th>
</tr></thead><tbody>
<tr>
<td><code>import java.io.*;</code></td>
<td>Import all classes from <code>java.io</code> package</td>
</tr>
<tr>
<td><code>class</code></td>
<td>Defines a class containing data and methods</td>
</tr>
<tr>
<td><code>static void main()</code></td>
<td><code>static</code> means method can be called without object instantiation</td>
</tr>
<tr>
<td><code>void</code></td>
<td>Method returns no value</td>
</tr>
<tr>
<td><code>System.in</code></td>
<td>Standard input stream (keyboard input)</td>
</tr>
<tr>
<td><code>System.out</code></td>
<td>Standard output stream (console output)</td>
</tr>
<tr>
<td><code>println()</code></td>
<td>Prints text and moves to a new line</td>
</tr>
</tbody></table>
<hr>
<h1 id="java-constructors">Java Constructors</h1>
<p>In Java:</p>
<ul>
<li>You can create multiple constructors in a single class without limit.</li>
<li>Constructors are special methods used to initialize objects.</li>
<li>They are invoked when an object is created using the <code>new</code> keyword.</li>
</ul>
<hr>
<h2 id="1-default-constructor">1. Default Constructor</h2>
<ul>
<li>No parameters.</li>
<li>Provided automatically by Java if no constructor is explicitly defined.</li>
</ul>
<pre><code class="language-java">
public class MyClass {
    // Default constructor
    public MyClass() {
        // Initialization logic
    }
}
</code></pre>
<hr>
<h2 id="2-parameterized-constructor">2. Parameterized Constructor</h2>
<ul>
<li>Takes one or more parameters.</li>
<li>Used to initialize object properties with given values.</li>
</ul>
<pre><code class="language-java">
public class MyClass {
    public MyClass(int x, String str) {
        // Initialization using parameters
    }
}
</code></pre>
<hr>
<h2 id="3-copy-constructor">3. Copy Constructor</h2>
<ul>
<li>Creates a new object by copying an existing object&#x27;s state.</li>
</ul>
<pre><code class="language-java">
public class MyClass {
    private int x;
    private String str;

    // Copy constructor
    public MyClass(MyClass original) {
        this.x = original.x;
        this.str = original.str;
    }
}
</code></pre>
<hr>
<h2 id="4-constructor-chaining">4. Constructor Chaining</h2>
<ul>
<li>One constructor calls another within the same class using <code>this()</code>.</li>
</ul>
<pre><code class="language-java">
public class MyClass {
    private int x;
    private String str;

    public MyClass(int x, String str) {
        this.x = x;
        this.str = str;
    }

    public MyClass() {
        this(0, &quot;default&quot;);
    }
}
</code></pre>
<hr>
<h2 id="5-private-constructor">5. Private Constructor</h2>
<ul>
<li>Has private access modifier.</li>
<li>Prevents instantiation from outside the class.</li>
<li>Commonly used for utility classes or singleton patterns.</li>
</ul>
<pre><code class="language-java">
public class UtilityClass {
    private UtilityClass() {
        // Prevent instantiation
    }
}
</code></pre>
<hr>
<h1 id="private-class-vs-private-constructor">Private Class vs Private Constructor</h1>
<table>
<thead><tr>
<th>Feature</th>
<th>Private Class</th>
<th>Private Constructor</th>
</tr></thead><tbody>
<tr>
<td><strong>Scope</strong></td>
<td>Accessible only within the enclosing class</td>
<td>Accessible only within the class itself</td>
</tr>
<tr>
<td><strong>Purpose</strong></td>
<td>Encapsulate helper functionality, inner logic</td>
<td>Prevent external instantiation of the class</td>
</tr>
<tr>
<td><strong>Instantiation</strong></td>
<td>Can be instantiated inside the enclosing class</td>
<td>Prevents instantiation except from within the class</td>
</tr>
<tr>
<td><strong>Use Cases</strong></td>
<td>Nested helper classes</td>
<td>Singleton pattern, utility classes, controlled creation</td>
</tr>
</tbody></table>
<hr>
<h2 id="example-private-class">Example: Private Class</h2>
<pre><code class="language-java">
public class OuterClass {

    private static class InnerClass {
        // Inner logic
    }

    public void doSomething() {
        InnerClass inner = new InnerClass();
        // Use inner instance
    }
}
</code></pre>
<hr>
<h2 id="example-private-constructor-singleton">Example: Private Constructor (Singleton)</h2>
<pre><code class="language-java">
public class Singleton {

    private static Singleton instance;

    private Singleton() {
        // Private constructor
    }

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

public class Main {
    public static void main(String[] args) {
        // Access the Singleton instance
        Singleton singleObject = Singleton.getInstance();

        // Use its methods
        singleObject.showMessage();
    }
}

</code></pre>
<hr>
<p><strong>Summary:</strong></p>
<ul>
<li><strong>Private Class:</strong> Controls access to the class itself (typically nested classes).</li>
<li><strong>Private Constructor:</strong> Controls instantiation of the class.</li>
<li>You don’t use new Singleton() because the constructor is private.</li>
<li>You always call Singleton.getInstance() to get the single shared instance.</li>
<li>Every time you call getInstance(), it will return the same object.</li>
</ul>
<hr>
<details>
<p>Yes — <strong>constructor chaining</strong> is just one form of “chaining,” but Java supports other kinds of chaining as well — especially in <em>method calls</em>, <em>builders</em>, and <em>functional streams</em>.</p>
<p>Let’s go step by step 👇</p>
<hr>
<h2 id="1-constructor-chaining">🧩 <strong>1️⃣ Constructor Chaining</strong></h2>
<p>You already know this one — when one constructor calls another within the same class (using <code>this()</code>) or a parent’s constructor (<code>super()</code>).</p>
<pre><code class="language-java">
class Vehicle {
    Vehicle() { System.out.println(&quot;Vehicle&quot;); }
    Vehicle(String type) { this(); System.out.println(type); }
}
</code></pre>
<p>✅ <strong>Purpose:</strong></p>
<p>Avoid code duplication and ensure consistent initialization.</p>
<hr>
<h2 id="2-method-chaining-fluent-interface">🧱 <strong>2️⃣ Method Chaining (Fluent Interface)</strong></h2>
<p>This is very common in modern Java APIs — a style where methods return <code>this</code> so calls can be chained.</p>
<hr>
<h3 id="basic-example">🔹 Basic Example</h3>
<pre><code class="language-java">
class Person {
    private String name;
    private int age;

    public Person setName(String name) {
        this.name = name;
        return this;
    }

    public Person setAge(int age) {
        this.age = age;
        return this;
    }
}

Person p = new Person()
                .setName(&quot;Alice&quot;)
                .setAge(30);
</code></pre>
<blockquote>✅ Each setter returns the same object → allows continuous chaining.</blockquote>
<p>This is called the <strong>Fluent Interface Pattern</strong>.</p>
<hr>
<h3 id="real-world-example-stringbuilder">🔹 Real-world Example: <code>StringBuilder</code></h3>
<pre><code class="language-java">
String result = new StringBuilder()
                    .append(&quot;Hello &quot;)
                    .append(&quot;World&quot;)
                    .append(&quot;!&quot;)
                    .toString();
</code></pre>
<p>Each <code>.append()</code> returns the same <code>StringBuilder</code> instance — that’s <strong>method chaining</strong> in action.</p>
<hr>
<h3 id="another-example-streams-api">🔹 Another Example: Streams API</h3>
<pre><code class="language-java">
List&lt;Integer&gt; result = numbers.stream()
                              .filter(n -&gt; n % 2 == 0)
                              .map(n -&gt; n * 2)
                              .sorted()
                              .toList();
</code></pre>
<p>Here, every intermediate operation returns a new <code>Stream</code>, enabling chainable operations.</p>
<hr>
<h2 id="3-builder-pattern-chaining-for-object-construction">🧩 <strong>3️⃣ Builder Pattern (Chaining for Object Construction)</strong></h2>
<p>Builder pattern is an <strong>advanced form of method chaining</strong> for immutable or complex objects.</p>
<h3 id="example">Example:</h3>
<pre><code class="language-java">
class User {
    private final String name;
    private final int age;

    private User(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
    }

    public static class Builder {
        private String name;
        private int age;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder age(int age) {
            this.age = age;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}
</code></pre>
<p>Usage:</p>
<pre><code class="language-java">
User u = new User.Builder()
                .name(&quot;Alice&quot;)
                .age(25)
                .build();
</code></pre>
<p>✅ <strong>Why it’s popular:</strong></p>
<ul>
<li>Makes object construction readable</li>
<li>Works well for immutable objects</li>
<li>Avoids telescoping constructors</li>
</ul>
<hr>
<h2 id="4-stream-chaining-functional-chaining">⚙️ <strong>4️⃣ Stream Chaining / Functional Chaining</strong></h2>
<p>In <strong>functional programming style</strong>, chaining is about <strong>composing transformations</strong>.</p>
<p>Example:</p>
<pre><code class="language-java">
String result = Optional.of(&quot; Java &quot;)
                        .map(String::trim)
                        .map(String::toUpperCase)
                        .orElse(&quot;EMPTY&quot;);
</code></pre>
<p>Each call returns another <code>Optional</code> → pure functional chaining.</p>
<hr>
<h2 id="5-operator-dsl-style-chaining">🧠 <strong>5️⃣ Operator / DSL-style Chaining</strong></h2>
<p>Some frameworks design <strong>DSLs (Domain-Specific Languages)</strong> using chaining to read like English.</p>
<p>Example (in Spring Security or Mockito):</p>
<pre><code class="language-java">
http.authorizeRequests()
    .antMatchers(&quot;/admin&quot;).hasRole(&quot;ADMIN&quot;)
    .antMatchers(&quot;/user&quot;).authenticated()
    .and()
    .formLogin();
</code></pre>
<p>or</p>
<pre><code class="language-java">
verify(userService, times(1)).save(any());
</code></pre>
<blockquote>✅ This chaining builds configuration objects step-by-step, making APIs more expressive.</blockquote>
<hr>
<h2 id="6-other-types-of-chaining-concepts">⚡ <strong>6️⃣ Other Types of “Chaining” Concepts</strong></h2>
<table>
<thead><tr>
<th>Type</th>
<th>Description</th>
<th>Example</th>
</tr></thead><tbody>
<tr>
<td><strong>Exception chaining</strong></td>
<td>One exception wraps another (cause chaining)</td>
<td><code>new RuntimeException(&quot;msg&quot;, cause)</code></td>
</tr>
<tr>
<td><strong>Stream/Functional chaining</strong></td>
<td>Each method returns a new instance for next transformation</td>
<td><code>.filter().map().collect()</code></td>
</tr>
<tr>
<td><strong>Builder chaining</strong></td>
<td>Build complex objects fluently</td>
<td><code>.name().age().build()</code></td>
</tr>
<tr>
<td><strong>Pipeline chaining</strong></td>
<td>Sequence of processing steps in design (e.g., servlet filters)</td>
<td><code>doFilter(request, response)</code></td>
</tr>
</tbody></table>
<hr>
<h2 id="7-pitfalls-best-practices">⚠️ <strong>7️⃣ Pitfalls / Best Practices</strong></h2>
<ul>
<li>Return <code>this</code> <strong>only when mutating the same instance</strong>.</li>
</ul>
<p>  (Builder pattern creates new instance at the end.)</p>
<ul>
<li>Avoid chaining <strong>void</strong> methods (they break the chain).</li>
<li>Ensure methods in the chain <strong>don’t depend on execution order unexpectedly</strong>.</li>
<li>Use chaining for <strong>readability</strong>, not just for compact code.</li>
</ul>
<hr>
<h2 id="summary">✅ <strong>Summary</strong></h2>
<table>
<thead><tr>
<th>Type</th>
<th>Example</th>
<th>Purpose</th>
</tr></thead><tbody>
<tr>
<td><strong>Constructor chaining</strong></td>
<td><code>this()</code> / <code>super()</code></td>
<td>Reuse constructor logic</td>
</tr>
<tr>
<td><strong>Method chaining</strong></td>
<td><code>.setName().setAge()</code></td>
<td>Fluent interface / readability</td>
</tr>
<tr>
<td><strong>Builder chaining</strong></td>
<td><code>.name().age().build()</code></td>
<td>Complex immutable object creation</td>
</tr>
<tr>
<td><strong>Stream chaining</strong></td>
<td><code>.filter().map().collect()</code></td>
<td>Functional data transformation</td>
</tr>
<tr>
<td><strong>Exception chaining</strong></td>
<td><code>new RuntimeException(cause)</code></td>
<td>Error context propagation</td>
</tr>
</tbody></table>
<hr>
<h3 id="tldr">🔑 TL;DR</h3>
<blockquote>✅ <em>Constructor chaining</em> → within the same class.</blockquote>
<blockquote>✅ <em>Method chaining</em> → between method calls returning <code>this</code> or new objects.</blockquote>
<blockquote>✅ <em>Builder / Stream chaining</em> → modern fluent APIs and functional pipelines.</blockquote>
<hr>
<h3 id="which-one-should-you-use">📊 Which One Should You Use?</h3>
<table>
<thead><tr>
<th>Approach</th>
<th>Best When</th>
</tr></thead><tbody>
<tr>
<td><code>Thread</code></td>
<td>Simple and quick demos/tests</td>
</tr>
<tr>
<td><code>Runnable</code></td>
<td>Cleaner logic, reusable, better practice</td>
</tr>
<tr>
<td><code>ExecutorService</code></td>
<td>Managing <strong>many tasks</strong>, scalability and control</td>
</tr>
<tr>
<td><code>CompletableFuture</code></td>
<td>Asynchronous, reactive programming, modern Java</td>
</tr>
</tbody></table>
</details>
<hr>
<hr>
<h1 id="modifiers-in-java">Modifiers in Java</h1>
<hr>
<h2 id="1-access-modifiers">1. Access Modifiers</h2>
<table>
<thead><tr>
<th>Modifier</th>
<th>Access within class</th>
<th>Access within package</th>
<th>Access outside package by subclass</th>
<th>Access outside package (non-subclass)</th>
</tr></thead><tbody>
<tr>
<td><strong>public</strong></td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td><strong>protected</strong></td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td><strong>default</strong></td>
<td>Yes</td>
<td>Yes</td>
<td>No</td>
<td>No</td>
</tr>
<tr>
<td><strong>private</strong></td>
<td>Yes</td>
<td>No</td>
<td>No</td>
<td>No</td>
</tr>
</tbody></table>
<h3 id="details">Details</h3>
<ul>
<li><strong><code>public</code></strong>: Accessible from anywhere.</li>
<li><strong><code>protected</code></strong>: Accessible in the same package and subclasses (even outside package).</li>
<li><strong><code>default</code></strong> (no modifier): Accessible only within the same package.</li>
<li><strong><code>private</code></strong>: Accessible only within the defining class.</li>
</ul>
<h3 id="example-of-private-modifier">Example of Private Modifier</h3>
<pre><code class="language-java">
class Sarath {
    private String name = &quot;sarath&quot;; // accessible only within this class
}

class Friend {
    public void access() {
        Sarath sar = new Sarath();
        String var = sar.name; // Compilation error: name has private access in Sarath
    }
}
</code></pre>
<hr>
<h3 id="private-constructor">Private Constructor</h3>
<ul>
<li>A constructor declared <code>private</code> restricts instantiation <strong>outside the class</strong>.</li>
<li>Commonly used in:</li>
</ul>
<ul>
<li><strong>Singleton Pattern</strong> (single instance control)</li>
<li><strong>Utility classes</strong> (only static members, no instances)</li>
</ul>
<pre><code class="language-java">
public class UtilityClass {
    private UtilityClass() {
        // Prevent instantiation
    }
}
</code></pre>
<hr>
<h2 id="2-non-access-modifiers">2. Non-Access Modifiers</h2>
<table>
<thead><tr>
<th>Modifier</th>
<th>Applies To</th>
<th>Purpose</th>
</tr></thead><tbody>
<tr>
<td><code>static</code></td>
<td>Variables, methods, inner classes</td>
<td>Makes members belong to the class rather than instances</td>
</tr>
<tr>
<td><code>final</code></td>
<td>Variables, methods, classes</td>
<td>Prevents reassignment, method overriding, or subclassing</td>
</tr>
<tr>
<td><code>abstract</code></td>
<td>Classes, methods</td>
<td>Defines classes or methods that cannot be instantiated or must be overridden</td>
</tr>
<tr>
<td><code>native</code></td>
<td>Methods</td>
<td>Declares a method implemented in platform-dependent code (e.g., C/C++)</td>
</tr>
<tr>
<td><code>strictfp</code></td>
<td>Classes, methods</td>
<td>Ensures consistent floating-point calculations across platforms (Removed in Java 17)</td>
</tr>
</tbody></table>
<hr>
<h3 id="static-modifier"><code>static</code> Modifier</h3>
<ul>
<li><strong>Static Variables (Class Variables)</strong></li>
</ul>
<ul>
<li>Single copy shared across all instances.</li>
<li>Used for constants or shared data.</li>
</ul>
<pre><code class="language-java">
public class MyClass {
    static int staticCount = 0;
}
</code></pre>
<ul>
<li><strong>Static Methods</strong></li>
</ul>
<ul>
<li>Called without creating an instance.</li>
<li>Cannot access instance members directly.</li>
</ul>
<pre><code class="language-java">
public class MyClass {
    static void display() {
        System.out.println(&quot;Static method&quot;);
    }
}
</code></pre>
<ul>
<li><strong>Static Blocks</strong></li>
</ul>
<ul>
<li>Run once when the class is loaded.</li>
<li>Used for static variable initialization or setup.</li>
</ul>
<pre><code class="language-java">
public class MyClass {
    static {
        System.out.println(&quot;Static block executed&quot;);
    }
}
</code></pre>
<p>In Java, a <strong>static block</strong> (also called a <em>static initializer block</em>) is used to initialize static variables </p>
<p>or run some setup code when the class is first loaded into memory by the JVM.</p>
<hr>
<h3 id="key-points-about-static-blocks">✅ Key Points about Static Blocks:</h3>
<ul>
<li><strong>Executed Once</strong></li>
</ul>
<ul>
<li>Runs only once, when the class is loaded into the JVM (before <code>main()</code> runs and before any object is created).</li>
</ul>
<ul>
<li><strong>Initialization of Static Variables</strong></li>
</ul>
<ul>
<li>Useful for assigning complex values to <code>static</code> variables that cannot be set with a single statement.</li>
</ul>
<ul>
<li><strong>Runs Before Constructor</strong></li>
</ul>
<ul>
<li>Executes before any constructor or instance block runs.</li>
</ul>
<ul>
<li><strong>Multiple Static Blocks</strong></li>
</ul>
<ul>
<li>You can have more than one static block; they are executed in the order they appear in the class.</li>
</ul>
<hr>
<h3 id="example">📌 Example:</h3>
<pre><code class="language-java">
class Demo {
    static int value;

    // Static block
    static {
        System.out.println(&quot;Static block executed.&quot;);
        value = 42; // Initializing static variable
    }

    public static void main(String[] args) {
        System.out.println(&quot;Main method executed.&quot;);
        System.out.println(&quot;Value = &quot; + value);
    }
}
</code></pre>
<p><strong>Output:</strong></p>
<pre><code class="language-">
Static block executed.
Main method executed.
Value = 42
</code></pre>
<hr>
<h3 id="common-uses">⚡ Common Uses:</h3>
<ul>
<li><strong>Complex static variable initialization</strong></li>
</ul>
<pre><code class="language-java">
static Map&lt;Integer, String&gt; map;
static {
   map = new HashMap&lt;&gt;();
   map.put(1, &quot;One&quot;);
   map.put(2, &quot;Two&quot;);
}
</code></pre>
<ul>
<li><strong>Loading native libraries</strong></li>
</ul>
<pre><code class="language-java">
static {
   System.loadLibrary(&quot;nativeLib&quot;);
}
</code></pre>
<ul>
<li><strong>Configuration setup</strong> (e.g., reading from a file or environment variables at class load time).</li>
</ul>
<hr>
<h3 id="final-modifier"><code>final</code> Modifier</h3>
<ul>
<li><strong>Final Variables</strong></li>
</ul>
<ul>
<li>Constants; value assigned once and cannot be changed.</li>
</ul>
<pre><code class="language-java">
final int MAX_USERS = 100;
</code></pre>
<ul>
<li><strong>Final Methods</strong></li>
</ul>
<ul>
<li>Cannot be overridden by subclasses.</li>
</ul>
<pre><code class="language-java">
public final void display() {
    System.out.println(&quot;Cannot override this method&quot;);
}
</code></pre>
<ul>
<li><strong>Final Classes</strong></li>
</ul>
<ul>
<li>Cannot be subclassed.</li>
</ul>
<pre><code class="language-java">
public final class UtilityClass {
    // cannot be extended
}
</code></pre>
<hr>
<h3 id="abstract-modifier"><code>abstract</code> Modifier</h3>
<ul>
<li><strong>Abstract Classes</strong></li>
</ul>
<ul>
<li>Cannot be instantiated directly.</li>
<li>May contain abstract methods (no implementation).</li>
</ul>
<pre><code class="language-java">
public abstract class Shape {
    abstract void draw();
}
</code></pre>
<ul>
<li><strong>Abstract Methods</strong></li>
</ul>
<ul>
<li>Must be overridden by subclasses.</li>
</ul>
<pre><code class="language-java">
public abstract void draw();
</code></pre>
<hr>
<h3 id="native-modifier"><code>native</code> Modifier</h3>
<ul>
<li>Indicates that the method is implemented in platform-dependent code, typically in C or C++.</li>
</ul>
<pre><code class="language-java">
public native void nativeMethod();
</code></pre>
<ul>
<li>Requires use of JNI (Java Native Interface).</li>
</ul>
<hr>
<h4 id="summary-table">Summary Table</h4>
<table>
<thead><tr>
<th>Modifier</th>
<th>Type</th>
<th>Can apply to</th>
<th>Effect / Use case</th>
</tr></thead><tbody>
<tr>
<td><code>public</code></td>
<td>Access</td>
<td>Classes, methods, vars</td>
<td>Accessible everywhere</td>
</tr>
<tr>
<td><code>protected</code></td>
<td>Access</td>
<td>Methods, vars</td>
<td>Package + subclasses only</td>
</tr>
<tr>
<td><code>default</code></td>
<td>Access</td>
<td>Classes, methods, vars</td>
<td>Package only</td>
</tr>
<tr>
<td><code>private</code></td>
<td>Access</td>
<td>Classes, methods, vars</td>
<td>Class only</td>
</tr>
<tr>
<td><code>static</code></td>
<td>Non-access</td>
<td>Vars, methods, classes</td>
<td>Belongs to class, shared</td>
</tr>
<tr>
<td><code>final</code></td>
<td>Non-access</td>
<td>Vars, methods, classes</td>
<td>Constant, no override, no subclass</td>
</tr>
<tr>
<td><code>abstract</code></td>
<td>Non-access</td>
<td>Classes, methods</td>
<td>Abstract behavior, must subclass/override</td>
</tr>
<tr>
<td><code>native</code></td>
<td>Non-access</td>
<td>Methods</td>
<td>Implemented in native code</td>
</tr>
<tr>
<td><code>strictfp</code></td>
<td>Non-access</td>
<td>Classes, methods</td>
<td>Consistent floating-point (removed in Java 17)</td>
</tr>
</tbody></table>
<hr>
<h1 id="strings-in-java">Strings in Java</h1>
<h2 id="string-vs-stringbuffer-vs-stringbuilder-vs-string-pool">String vs StringBuffer vs StringBuilder vs String Pool</h2>
<h3 id="string-vs-stringbuffer-vs-stringbuilder">String vs StringBuffer vs StringBuilder</h3>
<table>
<thead><tr>
<th>Feature</th>
<th>String</th>
<th>StringBuffer</th>
<th>StringBuilder</th>
</tr></thead><tbody>
<tr>
<td>Mutability</td>
<td>Immutable</td>
<td>Mutable</td>
<td>Mutable</td>
</tr>
<tr>
<td>Thread Safety</td>
<td>Thread-safe by nature</td>
<td>Thread-safe (synchronized)</td>
<td>Not thread-safe</td>
</tr>
<tr>
<td>Performance</td>
<td>Slow for concatenation</td>
<td>Slower due to synchronization</td>
<td>Faster (recommended for single-thread)</td>
</tr>
<tr>
<td>Introduced</td>
<td>Java 1.0</td>
<td>Java 1.0</td>
<td>Java 1.5</td>
</tr>
<tr>
<td>Use Case</td>
<td>When immutability needed</td>
<td>Multi-threaded environment string manipulation</td>
<td>Single-threaded environment string manipulation</td>
</tr>
</tbody></table>
<ul>
<li>Since <code>String</code> is immutable, every manipulation creates a new object, which may cause performance overhead and memory churn.</li>
<li><code>StringBuffer</code> and <code>StringBuilder</code> are mutable and provide methods like <code>append()</code>, <code>insert()</code>, <code>delete()</code>, and <code>substring()</code> for efficient string manipulation.</li>
<li>Internally, the <code>+</code> operator for string concatenation uses either <code>StringBuffer</code> or <code>StringBuilder</code>.</li>
</ul>
<hr>
<h3 id="string-pool">String Pool</h3>
<ul>
<li>A <strong>String Pool</strong> (or <strong>String Intern Pool</strong>) is a special memory area in the Java heap where JVM stores literal String values.</li>
<li>When a String literal is created, JVM checks the pool first. If it exists, the reference is reused; else, a new String object is created in the pool.</li>
<li>This saves memory and improves performance.</li>
</ul>
<pre><code class="language-java">
String literal = &quot;Sarath&quot;;           // Uses String Pool
String object = new String(&quot;Sarath&quot;); // New object on heap, not in pool by default

// Comparisons:
literal == object;  // false (different references)
literal == &quot;Sarath&quot;; // true (both point to pool)
</code></pre>
<hr>
<h3 id="memory-areas-related-to-strings">Memory Areas Related to Strings</h3>
<ul>
<li><strong>Eden Space:</strong> Where new objects (including String objects) are allocated.</li>
<li><strong>PermGen Space (Permanent Generation):</strong> Used in older Java versions to store class metadata and interned Strings.</li>
<li><strong>MetaSpace:</strong> Replaced PermGen since Java 8 to store class metadata outside the heap.</li>
</ul>
<hr>
<details>
<summary><strong>🧠 Java Memory Areas Related to Strings</strong></summary>
<h3 id="memory-areas-related-to-strings">Memory Areas Related to Strings</h3>
<p>Strings are stored differently depending on how they are created and the Java version.</p>
<div class="mermaid">
flowchart TD

    Start[&quot;String Creation&quot;]

    Start --&gt; IsLiteral{&quot;Is it a Literal?&quot;}

    %% new String path
    IsLiteral -- No --&gt; NewString[&quot;new String(&amp;quot;Hello&amp;quot;) &lt;br/&gt;(Heap Object)&quot;]
    NewString --&gt; Eden[&quot;Eden Space (Young Gen)&lt;br/&gt;(in Heap)&quot;]

    %% String literal path
    IsLiteral -- Yes --&gt; Literal[&quot;&amp;quot;Hello&amp;quot; (String Literal)&lt;br/&gt;Goes to String Pool&quot;]
    Literal --&gt; Interned[&quot;Interned in:&lt;br/&gt;- PermGen (Java ≤ 7)&lt;br/&gt;- Metaspace (Java 8+)&quot;]

</div>
<hr>
<h3 id="memory-areas-explained">Memory Areas Explained</h3>
<p><img src="../images/JavaBasic/HeapPermgenSpace.png" alt="HeapPermgenSpace"></p>
<table>
<thead><tr>
<th>Area</th>
<th>Description</th>
<th>Java Version</th>
</tr></thead><tbody>
<tr>
<td>Eden Space</td>
<td>New objects, including new Strings created with <code>new</code></td>
<td>All versions</td>
</tr>
<tr>
<td>PermGen Space</td>
<td>Stores class metadata and interned strings</td>
<td>Java 7 and below</td>
</tr>
<tr>
<td>MetaSpace</td>
<td>Replaces PermGen for class metadata and interned strings</td>
<td>Java 8 and above</td>
</tr>
</tbody></table>
<hr>
<h3 id="interning-and-string-pool">Interning and String Pool</h3>
<ul>
<li><strong>String Pool</strong> stores literals and interned strings.</li>
<li><code>String.intern()</code> adds strings explicitly to the pool.</li>
<li>Pool was in PermGen (≤Java7), moved to MetaSpace (Java8+).</li>
</ul>
<hr>
<h3 id="example">Example</h3>
<pre><code class="language-java">
String a = &quot;Hello&quot;;              // Stored in String pool
String b = new String(&quot;Hello&quot;);  // New object in Eden Space (Heap)

System.out.println(a == b);          // false
System.out.println(a == b.intern()); // true
</code></pre>
<hr>
<h3 id="summary-table">Summary Table</h3>
<table>
<thead><tr>
<th>Java Version</th>
<th>Heap (Eden Space)</th>
<th>PermGen / MetaSpace</th>
<th>String Pool Location</th>
</tr></thead><tbody>
<tr>
<td>Java ≤ 7</td>
<td><code>new String()</code> objects</td>
<td>PermGen</td>
<td>PermGen</td>
</tr>
<tr>
<td>Java 8+</td>
<td><code>new String()</code> objects</td>
<td>MetaSpace</td>
<td>MetaSpace</td>
</tr>
</tbody></table>
</details>
<hr>
<h2 id="java-memory-spaces-jvm-memory-structure">🧠 Java Memory Spaces (JVM Memory Structure)</h2>
<p>Java Virtual Machine (JVM) memory is split into several <strong>memory areas</strong>, each with a <strong>specific purpose</strong> for managing objects, threads, and class-level data.</p>
<hr>
<h3 id="flow-diagram-markdown-text-format">🔁 Flow Diagram (Markdown Text Format)</h3>
<div class="mermaid">
flowchart TD

    App[&quot;Java Application&quot;]
    App --&gt; JVM[&quot;JVM Memory Structure&quot;]

    JVM --&gt; Heap[&quot;Heap&quot;]
    JVM --&gt; Stack[&quot;Stack (Thread-local)&quot;]
    JVM --&gt; Metaspace[&quot;Metaspace (Class info)&quot;]

    %% Heap internals
    Heap --&gt; YoungGen[&quot;Young Generation&lt;br/&gt;(Eden + 2 Survivor spaces)&quot;]
    Heap --&gt; OldGen[&quot;Old Generation&lt;br/&gt;(Tenured space)&quot;]

    %% Stack internals
    Stack --&gt; Primitives[&quot;Primitive Locals&quot;]

    %% Metaspace internals
    Metaspace --&gt; ClassNames[&quot;Class Names&quot;]
    Metaspace --&gt; Methods[&quot;Methods&quot;]
    Metaspace --&gt; ConstantPool[&quot;Constant Pool&quot;]
</div>
<hr>
<h2 id="jvm-memory-areas-explained">🧩 JVM Memory Areas Explained</h2>
<h3 id="1-heap">1. <strong>Heap</strong></h3>
<ul>
<li><strong>Purpose</strong>: Stores all <strong>objects</strong>, <strong>class instances</strong>, <strong>arrays</strong></li>
<li><strong>Managed by</strong>: Garbage Collector (GC)</li>
<li><strong>Subdivided into</strong>:</li>
</ul>
<ul>
<li><strong>Young Generation</strong></li>
</ul>
<ul>
<li><strong>Eden Space</strong>: New objects created here.</li>
<li><strong>Survivor Spaces (S0/S1)</strong>: Surviving objects from minor GC.</li>
<li><strong>Old Generation</strong>: Long-lived objects promoted here.</li>
</ul>
<hr>
<h3 id="2-young-generation-yg">2. <strong>Young Generation (YG)</strong></h3>
<ul>
<li>Optimized for fast allocation and collection (minor GC).</li>
<li><strong>Eden Space</strong>:</li>
</ul>
<ul>
<li>Where all new objects are created.</li>
<li>If not garbage collected, moved to Survivor.</li>
<li><strong>Survivor Space (S0 &amp; S1)</strong>:</li>
</ul>
<ul>
<li>Objects that survive GC cycles.</li>
<li>After a few cycles, moved to Old Gen.</li>
</ul>
<hr>
<h3 id="3-old-generation-tenured">3. <strong>Old Generation (Tenured)</strong></h3>
<ul>
<li>Stores <strong>long-living objects</strong> (e.g., strings in use, singletons).</li>
<li>Collected less frequently via <strong>major GC</strong> (slower than minor GC).</li>
</ul>
<hr>
<h3 id="4-stack">4. <strong>Stack</strong></h3>
<ul>
<li><strong>Thread-local memory</strong></li>
<li>Stores:</li>
</ul>
<ul>
<li>Method calls (stack frames)</li>
<li>Primitive local variables</li>
<li>Object references (not actual objects)</li>
<li>Automatically <strong>pushed/popped</strong> during method calls</li>
<li>Faster than heap memory</li>
<li>Throws <code>StackOverflowError</code> if exceeded</li>
</ul>
<hr>
<h3 id="5-metaspace-java-8">5. <strong>Metaspace</strong> (Java 8+)</h3>
<ul>
<li>Stores <strong>class metadata</strong></li>
<li>Replaced <strong>PermGen</strong> from Java 8 onwards</li>
<li>Grows dynamically (unlike PermGen which had fixed size)</li>
<li>Contains:</li>
</ul>
<ul>
<li>Class names</li>
<li>Method/field metadata</li>
<li>Constant pool (for that class)</li>
<li><strong>Not part of the heap</strong> — resides in <strong>native memory</strong></li>
</ul>
<hr>
<h3 id="6-program-counter-pc-register">6. <strong>Program Counter (PC) Register</strong></h3>
<ul>
<li><strong>Thread-specific</strong>: Keeps track of current instruction address</li>
<li>Helps resume execution in the correct place</li>
</ul>
<hr>
<h3 id="7-native-method-stack">7. <strong>Native Method Stack</strong></h3>
<ul>
<li>For executing <strong>native (non-Java)</strong> methods via JNI (Java Native Interface)</li>
</ul>
<hr>
<h4 id="summary-table">✅ Summary Table</h4>
<table>
<thead><tr>
<th>Memory Area</th>
<th>Purpose</th>
<th>Collected by GC</th>
<th>Thread Scoped</th>
</tr></thead><tbody>
<tr>
<td>Heap (Eden + Old)</td>
<td>Stores objects, arrays</td>
<td>✅</td>
<td>❌</td>
</tr>
<tr>
<td>Stack</td>
<td>Stores local variables &amp; method calls</td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td>Metaspace</td>
<td>Class metadata</td>
<td>✅ (limited)</td>
<td>❌</td>
</tr>
<tr>
<td>PC Register</td>
<td>Tracks next instruction</td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td>Native Stack</td>
<td>Native method handling</td>
<td>❌</td>
<td>✅</td>
</tr>
</tbody></table>
<h3 id="jvm-memory-areas-explained">JVM Memory Areas Explained</h3>
<table>
<thead><tr>
<th>Memory Area</th>
<th>Purpose</th>
<th>Notes</th>
</tr></thead><tbody>
<tr>
<td><strong>Heap</strong></td>
<td>Stores objects and arrays</td>
<td>Managed by Garbage Collector</td>
</tr>
<tr>
<td><strong>Young Generation</strong></td>
<td>New objects allocated here</td>
<td>Eden + Survivor spaces</td>
</tr>
<tr>
<td><strong>Old Generation</strong></td>
<td>Long-lived objects moved here</td>
<td>Major GC occurs</td>
</tr>
<tr>
<td><strong>Stack</strong></td>
<td>Stores method calls, primitives, references</td>
<td>Thread-local, fast access</td>
</tr>
<tr>
<td><strong>Metaspace</strong></td>
<td>Stores class metadata and interned strings</td>
<td>Outside heap, Java 8+</td>
</tr>
<tr>
<td><strong>PC Register</strong></td>
<td>Tracks current instruction address</td>
<td>Thread-local</td>
</tr>
<tr>
<td><strong>Native Method Stack</strong></td>
<td>For native method execution</td>
<td>JNI calls</td>
</tr>
<hr>
</tbody></table>
<h3 id="string-literal-vs-string-object">String Literal vs String Object</h3>
<ul>
<li><strong>String Literal:</strong> Stored in the String pool.</li>
<li><strong>String Object:</strong> Created via <code>new</code> keyword, stored in heap, separate from the pool.</li>
<li><code>.intern()</code> can be used to add a String object to the pool explicitly.</li>
</ul>
<hr>
<h3 id="string-manipulation-concat-vs-operator">String Manipulation: <code>concat()</code> vs <code>+</code> Operator</h3>
<ul>
<li><code>concat()</code> only creates a new String object if the length of the string being concatenated is greater than zero.</li>
<li>The <code>+</code> operator always creates a new String object regardless.</li>
</ul>
<pre><code class="language-java">
String str1 = &quot;Rock&quot;;
String str2 = &quot;Star&quot;;
String str3 = str1.concat(str2); // &quot;RockStar&quot;
</code></pre>
<hr>
<h3 id="deep-copy-vs-shallow-copy">Deep Copy vs Shallow Copy</h3>
<ul>
<li><strong>Shallow Copy:</strong> Copies only the reference of an object; both objects point to the same data.</li>
<li><strong>Deep Copy:</strong> Copies the actual data and creates an independent clone.</li>
</ul>
<hr>
<h3 id="why-is-string-immutable-in-java">Why is String Immutable in Java?</h3>
<ul>
<li>Multiple references can point to the same String in the String pool.</li>
<li>If String were mutable, one reference changing the String would affect others unexpectedly.</li>
<li>Immutability ensures thread safety, security, and consistency.</li>
<li>Immutable Strings have stable hash codes, making them reliable as keys in hash-based collections.</li>
</ul>
<hr>
<h3 id="creating-an-immutable-class-in-java">Creating an Immutable Class in Java</h3>
<ul>
<li>Declare the class as <code>final</code> so it can&#x27;t be extended.</li>
<li>Declare all fields as <code>private</code> and <code>final</code>.</li>
<li>Do not provide setter methods.</li>
<li>Initialize all fields via constructor (defensive copies for mutable fields).</li>
<li>Provide only getters.</li>
<li>Ensure deep copy of mutable objects.</li>
</ul>
<hr>
<h3 id="creating-a-singleton-class-in-java">Creating a Singleton Class in Java</h3>
<pre><code class="language-java">
public class Database {

    private static Database dbInstance;

    private Database() {
        // private constructor to prevent instantiation
    }

    public static synchronized Database getInstance() {
        if (dbInstance == null) {
            dbInstance = new Database();
        }
        return dbInstance;
    }
}
</code></pre>
<hr>
<h1 id="wrapper-classes-and-autoboxing">Wrapper Classes and Autoboxing</h1>
<p>Java provides wrapper classes for primitives to allow objects to represent primitive types.</p>
<table>
<thead><tr>
<th>Primitive Type</th>
<th>Wrapper Class</th>
</tr></thead><tbody>
<tr>
<td>int</td>
<td>Integer</td>
</tr>
<tr>
<td>long</td>
<td>Long</td>
</tr>
<tr>
<td>short</td>
<td>Short</td>
</tr>
<tr>
<td>byte</td>
<td>Byte</td>
</tr>
<tr>
<td>char</td>
<td>Character</td>
</tr>
<tr>
<td>float</td>
<td>Float</td>
</tr>
<tr>
<td>double</td>
<td>Double</td>
</tr>
<tr>
<td>boolean</td>
<td>Boolean</td>
</tr>
</tbody></table>
<hr>
<details>
<summary>🧩 Primitive vs Wrapper Class in Java</summary>
<h3 id="1-definition">🔹 <strong>1. Definition</strong></h3>
<table>
<thead><tr>
<th>Type</th>
<th>Example</th>
<th>Stored in</th>
<th>Default Value</th>
<th>Nullable</th>
<th>Usage</th>
</tr></thead><tbody>
<tr>
<td><strong>Primitive</strong></td>
<td><code>int</code>, <code>boolean</code>, <code>char</code>, <code>double</code></td>
<td>Stack / directly in variable</td>
<td><code>0</code>, <code>false</code>, etc.</td>
<td>❌ No</td>
<td>Fast and memory-efficient</td>
</tr>
<tr>
<td><strong>Wrapper Class</strong></td>
<td><code>Integer</code>, <code>Boolean</code>, <code>Character</code>, <code>Double</code></td>
<td>Heap (as an Object)</td>
<td><code>null</code></td>
<td>✅ Yes</td>
<td>Used with Collections, Generics, or when <code>null</code> is meaningful</td>
</tr>
</tbody></table>
<hr>
<h3 id="2-why-wrapper-classes-exist">🔹 <strong>2. Why Wrapper Classes Exist</strong></h3>
<p>Java’s <strong>Collections (e.g., List, Map, Set)</strong> and <strong>Generics</strong> can only work with <em>objects</em>, not primitive types.</p>
<p>Example:</p>
<pre><code class="language-java">
List&lt;int&gt; list = new ArrayList&lt;&gt;();   // ❌ Not allowed
List&lt;Integer&gt; list = new ArrayList&lt;&gt;(); // ✅ Works
</code></pre>
<p>Wrapper classes wrap the primitive in an object so it can behave like any other reference type.</p>
<hr>
<h3 id="3-auto-boxing-unboxing">🔹 <strong>3. Auto-Boxing &amp; Unboxing</strong></h3>
<p>Java automatically converts between primitives and their wrappers:</p>
<pre><code class="language-java">
int a = 10;
Integer b = a;  // Auto-boxing (primitive -&gt; wrapper)
int c = b;      // Unboxing (wrapper -&gt; primitive)
</code></pre>
<hr>
<h3 id="4-example-boolean-vs-boolean">🔹 <strong>4. Example — boolean vs Boolean</strong></h3>
<pre><code class="language-java">
class Example {
    boolean primitiveBool;
    Boolean wrapperBool;

    void showDefaults() {
        System.out.println(&quot;boolean default: &quot; + primitiveBool);
        System.out.println(&quot;Boolean default: &quot; + wrapperBool);
    }

    public static void main(String[] args) {
        new Example().showDefaults();
    }
}
</code></pre>
<p><strong>Output:</strong></p>
<pre><code class="language-">
boolean default: false
Boolean default: null
</code></pre>
<p>✅ <strong>Explanation:</strong></p>
<ul>
<li><code>boolean</code> → primitive, default is <code>false</code>.</li>
<li><code>Boolean</code> → object, default is <code>null</code>.</li>
</ul>
<hr>
<h3 id="5-key-differences-summary">🔹 <strong>5. Key Differences Summary</strong></h3>
<table>
<thead><tr>
<th>Feature</th>
<th>Primitive</th>
<th>Wrapper Class</th>
</tr></thead><tbody>
<tr>
<td><strong>Type</strong></td>
<td>Data type</td>
<td>Object</td>
</tr>
<tr>
<td><strong>Default Value</strong></td>
<td>e.g. <code>0</code>, <code>false</code></td>
<td><code>null</code></td>
</tr>
<tr>
<td><strong>Can be null?</strong></td>
<td>❌ No</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><strong>Stored in</strong></td>
<td>Stack</td>
<td>Heap</td>
</tr>
<tr>
<td><strong>Performance</strong></td>
<td>Fast</td>
<td>Slightly slower</td>
</tr>
<tr>
<td><strong>Used in Collections</strong></td>
<td>❌ No</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><strong>Example</strong></td>
<td><code>int</code>, <code>boolean</code></td>
<td><code>Integer</code>, <code>Boolean</code></td>
</tr>
</tbody></table>
<hr>
<h3 id="in-short">🧠 <strong>In short</strong></h3>
<ul>
<li>Use <strong>primitives</strong> when performance and memory are critical.</li>
<li>Use <strong>wrappers</strong> when you need <code>null</code> values, or when working with <strong>Collections</strong> or <strong>Generics</strong>.</li>
</ul>
</details>
<hr>
<h3 id="autoboxing">Autoboxing</h3>
<ul>
<li>Automatic conversion of primitive types to their corresponding wrapper classes.</li>
</ul>
<h3 id="example-custom-wrapper-class-demonstrating-autoboxing">Example Custom Wrapper Class Demonstrating Autoboxing</h3>
<pre><code class="language-java">
public class MyInteger {
    private int value;

    // Constructor
    public MyInteger(int value) {
        this.value = value;
    }

    // Getter
    public int getValue() {
        return value;
    }

    // Setter
    public void setValue(int value) {
        this.value = value;
    }

    // Method demonstrating autoboxing
    public void setIntegerValue(Integer integerValue) {
        this.value = integerValue;  // Autoboxing converts Integer to int automatically
    }

    public static void main(String[] args) {
        MyInteger myIntWrapper = new MyInteger(42);
        System.out.println(&quot;Wrapped Value: &quot; + myIntWrapper.getValue());

        myIntWrapper.setValue(100);
        System.out.println(&quot;Modified Value: &quot; + myIntWrapper.getValue());

        myIntWrapper.setIntegerValue(123); // Autoboxing occurs here
        System.out.println(&quot;Autoboxed Value: &quot; + myIntWrapper.getValue());
    }
}
</code></pre>
<h3 id="stackoverflow-due-to-out-of-memory">StackOverflow - Due to out of memory</h3>
<details>
<summary>📦 <strong>Pass by Value vs Pass by Reference</strong></summary>
<ul>
<li>Java is <strong>always pass by value</strong>.</li>
<li>It does <strong>not support pass by reference</strong>.</li>
<li>Object references are passed by value, but the reference still points to the same object.</li>
</ul>
</details>
<hr>
<h1 id="object-oriented-programming-oop-in-java">Object-Oriented Programming (OOP) in Java</h1>
<p><img src="../images/JavaBasic/oops.jpg" alt="oops"></p>
<p>OOP refers to programming using <strong>objects</strong>. The main concepts are:</p>
<ul>
<li>Polymorphism</li>
<li>Encapsulation</li>
<li>Inheritance</li>
<li>Abstraction</li>
<li>Class, Object, Method</li>
</ul>
<hr>
<h2 id="1-polymorphism">1. Polymorphism</h2>
<h3 id="definition">Definition</h3>
<p>Ability to differentiate entities with the same name efficiently. Achieved mainly by:</p>
<ul>
<li><strong>Compile-time Polymorphism</strong> (Method Overloading)</li>
<li><strong>Run-time Polymorphism</strong> (Method Overriding)</li>
</ul>
<h3 id="inheritance-vs-polymorphism">Inheritance vs Polymorphism</h3>
<ul>
<li><strong>Inheritance</strong>: New class inherits properties/methods of an existing class (code reuse).</li>
<li><strong>Polymorphism</strong>: Same method name behaves differently based on context (overloading/overriding).</li>
</ul>
<h3 id="types-of-inheritance">Types of Inheritance</h3>
<ul>
<li>Single</li>
<li>Multi-level</li>
<li>Multiple (Not supported in Java classes)</li>
<li>Hybrid</li>
<li>Hierarchical</li>
</ul>
<hr>
<h3 id="method-overloading">Method Overloading</h3>
<p>Same method name with different parameters in the same class.</p>
<h3 id="constructor-overloading">Constructor Overloading</h3>
<p>Multiple constructors with different parameter lists.</p>
<h3 id="method-overriding">Method Overriding</h3>
<p>Subclass provides specific implementation of a superclass method.</p>
<h4 id="covariant-return-type">Covariant Return Type</h4>
<p>Overriding method can return subtype of the original method&#x27;s return type.</p>
<hr>
<h3 id="overriding-restrictions-on-private-static-final-methods">Overriding Restrictions on private, static, final methods</h3>
<table>
<thead><tr>
<th>Modifier</th>
<th>Overridable?</th>
<th>Explanation</th>
</tr></thead><tbody>
<tr>
<td>private</td>
<td>No</td>
<td>Not visible to subclasses</td>
</tr>
<tr>
<td>static</td>
<td>No</td>
<td>Resolved at compile-time (static binding)</td>
</tr>
<tr>
<td>final</td>
<td>No</td>
<td>Cannot be changed by subclasses</td>
</tr>
</tbody></table>
<h4 id="overloading-allowed-for-private-static-final-methods-within-same-class">Overloading allowed for private, static, final methods within same class</h4>
<pre><code class="language-java">
public class Example {
    private static final void method() {
        System.out.println(&quot;Private static final no-arg&quot;);
    }
    private static final void method(int x) {
        System.out.println(&quot;Private static final with int: &quot; + x);
    }
    public static void main(String[] args) {
        Example.method();
        Example.method(5);
    }
}
</code></pre>
<hr>
<h3 id="data-binding-in-java">Data Binding in Java</h3>
<p><img src="../images/JavaBasic/staticVsDynamicBinding.png" alt="staticVsDynamicBinding"></p>
<ul>
<li><strong>Static Binding (Early Binding)</strong>: Method calls resolved at compile-time (static, private, final methods).</li>
<li><strong>Dynamic Binding (Late Binding)</strong>: Method calls resolved at runtime via overriding (non-static, non-final, non-private methods).</li>
</ul>
<p>Example of dynamic binding:</p>
<pre><code class="language-java">
class Animal { void sound() { System.out.println(&quot;Animal sound&quot;); } }
class Dog extends Animal { void sound() { System.out.println(&quot;Dog barks&quot;); } }

Animal animal = new Dog();
animal.sound();  // Prints: Dog barks (dynamic binding)
</code></pre>
<hr>
<h2 id="2-inheritance">2. Inheritance</h2>
<ul>
<li>Mechanism where subclass inherits fields and methods of superclass.</li>
<li>Java <strong>does not support multiple inheritance</strong> with classes due to ambiguity issues.</li>
<li>Terminology:</li>
</ul>
<ul>
<li><strong>Superclass/Base/Parent</strong></li>
<li><strong>Subclass/Derived/Child</strong></li>
</ul>
<hr>
<h2 id="3-encapsulation">3. Encapsulation</h2>
<ul>
<li>Hiding internal state and requiring all interaction to be performed through an object&#x27;s methods.</li>
<li>Protects object integrity by preventing direct access to fields.</li>
<li>Improves code maintainability.</li>
</ul>
<hr>
<h2 id="4-abstraction">4. Abstraction</h2>
<ul>
<li>Abstract classes may have abstract methods (no body) and concrete methods.</li>
<li>Declared using <code>abstract</code> keyword.</li>
<li>Provides a base class that subclasses must extend and implement abstract methods.</li>
</ul>
<hr>
<h2 id="5-interface">5. Interface</h2>
<ul>
<li>Defines <strong>abstract methods</strong> (Java 7 and before: only abstract methods).</li>
<li>Since Java 8: supports <code>default</code> and <code>static</code> methods with bodies.</li>
<li>Java 9: supports <code>private</code> methods for code reuse inside interfaces.</li>
</ul>
<h3 id="private-methods-in-interface">Private methods in interface</h3>
<ul>
<li>Used to avoid code duplication in default/static methods.</li>
<li>Not accessible by implementing classes.</li>
</ul>
<pre><code class="language-java">
public interface MyInterface {
    void publicAbstractMethod();
    default void defaultMethod() {
        privateHelper();
    }
    static void staticMethod() {
        privateHelper();
    }
    private void privateHelper() {
        System.out.println(&quot;Helper inside interface&quot;);
    }
}
</code></pre>
<hr>
<h3 id="variables-in-interfaces">Variables in Interfaces</h3>
<ul>
<li>Implicitly <code>public static final</code> (constants).</li>
</ul>
<h3 id="class-inside-interface">Class inside Interface</h3>
<ul>
<li>Allowed; nested class inside interface is implicitly <code>public static</code>.</li>
</ul>
<pre><code class="language-java">
interface Outer {
    class Inner {
        void display() {
            System.out.println(&quot;Class inside interface&quot;);
        }
    }
}

public class Test {
    public static void main(String[] args) {
        Outer.Inner obj = new Outer.Inner();
        obj.display();
    }
}
</code></pre>
<h3 id="interface-inside-class">Interface inside Class</h3>
<ul>
<li>Nested interfaces are implicitly <code>static</code>.</li>
</ul>
<pre><code class="language-java">
class Outer {
    interface InnerInterface {
        void display();
    }
}

class Impl implements Outer.InnerInterface {
    public void display() {
        System.out.println(&quot;Interface inside class&quot;);
    }
}
</code></pre>
<hr>
<h3 id="marker-interface-vs-functional-interface">Marker Interface vs Functional Interface</h3>
<table>
<thead><tr>
<th>Interface Type</th>
<th>Description</th>
<th>Example</th>
</tr></thead><tbody>
<tr>
<td>Marker Interface</td>
<td>No methods; used to mark a class for special treatment</td>
<td><code>Serializable</code></td>
</tr>
<tr>
<td>Functional Interface</td>
<td>Exactly one abstract method; can have default/static methods</td>
<td><code>Runnable</code></td>
</tr>
</tbody></table>
<hr>
<p>Below is a <strong>refactored, expandable / collapsible Markdown section</strong> that cleanly <strong>extends your table</strong> and <strong>covers all commonly used Functional Interfaces and Marker Interfaces</strong>, without repetition and in an <strong>exam-ready + interview-ready</strong> structure.</p>
<p>You can directly paste this into your master notes.</p>
<hr>
<h2 id="common-functional-interfaces-marker-interfaces-java">🧩 Common Functional Interfaces &amp; Marker Interfaces (Java)</h2>
<details>
<summary><strong>📌 What are Functional Interfaces?</strong></summary>
<ul>
<li>A <strong>Functional Interface</strong> has <strong>exactly one abstract method</strong></li>
<li>Introduced mainly for <strong>Lambda expressions</strong> (Java 8)</li>
<li>Can have:</li>
</ul>
<ul>
<li>default methods</li>
<li>static methods</li>
<li>Annotated with <code>@FunctionalInterface</code> (optional but recommended)</li>
</ul>
</details>
<hr>
<details>
<summary><strong>⚙️ Core Functional Interfaces (java.lang & java.util.concurrent)</strong></summary>
<table>
<thead><tr>
<th>Interface</th>
<th>Method Signature</th>
<th>Notes</th>
</tr></thead><tbody>
<tr>
<td>Runnable</td>
<td><code>void run()</code></td>
<td>Used in threads, no return value</td>
</tr>
<tr>
<td>Callable</td>
<td><code>V call()</code></td>
<td>Returns value, can throw checked exception</td>
</tr>
<tr>
<td>Comparable</td>
<td><code>int compareTo(T o)</code></td>
<td>Defines natural ordering</td>
</tr>
<tr>
<td>Comparator</td>
<td><code>int compare(T o1, T o2)</code></td>
<td>Custom sorting logic</td>
</tr>
</tbody></table>
</details>
<hr>
<details>
<summary><strong>🔁 Core Functional Interfaces (java.util.function)</strong></summary>
<table>
<thead><tr>
<th>Interface</th>
<th>Method</th>
<th>Input</th>
<th>Output</th>
<th>Use Case</th>
</tr></thead><tbody>
<tr>
<td>Supplier&lt;T&gt;</td>
<td><code>T get()</code></td>
<td>❌</td>
<td>✅</td>
<td>Supplies data</td>
</tr>
<tr>
<td>Consumer&lt;T&gt;</td>
<td><code>void accept(T)</code></td>
<td>✅</td>
<td>❌</td>
<td>Consumes data</td>
</tr>
<tr>
<td>Predicate&lt;T&gt;</td>
<td><code>boolean test(T)</code></td>
<td>✅</td>
<td>boolean</td>
<td>Condition check</td>
</tr>
<tr>
<td>Function&lt;T,R&gt;</td>
<td><code>R apply(T)</code></td>
<td>✅</td>
<td>✅</td>
<td>Transformation</td>
</tr>
<tr>
<td>UnaryOperator&lt;T&gt;</td>
<td><code>T apply(T)</code></td>
<td>✅</td>
<td>Same type</td>
<td>Single input operation</td>
</tr>
<tr>
<td>BinaryOperator&lt;T&gt;</td>
<td><code>T apply(T,T)</code></td>
<td>2 inputs</td>
<td>Same type</td>
<td>Combine two values</td>
</tr>
</tbody></table>
</details>
<hr>
<details>
<summary><strong>🧠 Primitive Specializations</strong></summary>
<p>Used to <strong>avoid autoboxing overhead</strong>.</p>
<table>
<thead><tr>
<th>Interface</th>
<th>Example</th>
</tr></thead><tbody>
<tr>
<td>IntPredicate</td>
<td><code>boolean test(int)</code></td>
</tr>
<tr>
<td>LongConsumer</td>
<td><code>void accept(long)</code></td>
</tr>
<tr>
<td>DoubleSupplier</td>
<td><code>double getAsDouble()</code></td>
</tr>
<tr>
<td>IntFunction&lt;R&gt;</td>
<td><code>R apply(int)</code></td>
</tr>
</tbody></table>
</details>
<hr>
<details>
<summary><strong>🧪 Examples (Lambda Ready)</strong></summary>
<pre><code class="language-java">
Supplier&lt;String&gt; supplier = () -&gt; &quot;Hello&quot;;

Consumer&lt;String&gt; consumer = s -&gt; System.out.println(s);

Predicate&lt;Integer&gt; isPositive = x -&gt; x &gt; 0;

Function&lt;String, Integer&gt; length = s -&gt; s.length();

UnaryOperator&lt;Integer&gt; square = x -&gt; x * x;

BinaryOperator&lt;Integer&gt; sum = (a, b) -&gt; a + b;
</code></pre>
</details>
<hr>
<details>
<summary><strong>🏷️ What are Marker Interfaces?</strong></summary>
<ul>
<li>Marker interfaces <strong>do not have methods</strong></li>
<li>Used to <strong>mark a class</strong></li>
<li>JVM or frameworks check presence using <code>instanceof</code></li>
<li>Enable or change behavior implicitly</li>
</ul>
</details>
<hr>
<details>
<summary><strong>🏷️ Common Marker Interfaces</strong></summary>
<table>
<thead><tr>
<th>Interface</th>
<th>Purpose</th>
</tr></thead><tbody>
<tr>
<td>Cloneable</td>
<td>Allows object cloning using <code>clone()</code></td>
</tr>
<tr>
<td>Serializable</td>
<td>Enables object serialization</td>
</tr>
<tr>
<td>RandomAccess</td>
<td>Indicates fast random access (ArrayList)</td>
</tr>
<tr>
<td>SingleThreadModel <em>(deprecated)</em></td>
<td>Thread control in servlets</td>
</tr>
</tbody></table>
</details>
<hr>
<details>
<summary><strong>📌 Marker vs Functional Interface</strong></summary>
<table>
<thead><tr>
<th>Aspect</th>
<th>Functional Interface</th>
<th>Marker Interface</th>
</tr></thead><tbody>
<tr>
<td>Methods</td>
<td>Exactly one abstract</td>
<td>No methods</td>
</tr>
<tr>
<td>Purpose</td>
<td>Lambda expressions</td>
<td>Metadata / behavior hint</td>
</tr>
<tr>
<td>Example</td>
<td>Supplier, Predicate</td>
<td>Serializable, Cloneable</td>
</tr>
<tr>
<td>JVM usage</td>
<td>Executes logic</td>
<td>Checks capability</td>
</tr>
</tbody></table>
</details>
<hr>
<details>
<summary><strong>🧠 Interview One-Liners</strong></summary>
<ul>
<li><strong>Runnable vs Callable</strong> → Callable returns value &amp; throws checked exception</li>
<li><strong>Predicate vs Function</strong> → Predicate returns boolean, Function returns object</li>
<li><strong>UnaryOperator</strong> → Function with same input/output type</li>
<li><strong>Marker Interface</strong> → Enables behavior without methods</li>
</ul>
</details>
<hr>
<h3 id="java-8-interface-enhancements">Java 8+ Interface Enhancements</h3>
<ul>
<li><code>default</code> methods with implementation</li>
<li><code>static</code> methods</li>
<li><code>@FunctionalInterface</code> annotation to indicate single abstract method interface</li>
</ul>
<p>Example:</p>
<pre><code class="language-java">
public interface DefaultStaticExampleInterface {
    default void show() {
        System.out.println(&quot;Default method in interface&quot;);
    }
    static void display() {
        System.out.println(&quot;Static method in interface&quot;);
    }
}

public class DefaultStaticExampleClass implements DefaultStaticExampleInterface {}

public class Main {
    public static void main(String[] args) {
        DefaultStaticExampleInterface.display();
        DefaultStaticExampleClass obj = new DefaultStaticExampleClass();
        obj.show();
    }
}
</code></pre>
<hr>
<h2 id="6-functional-interfaces-in-java-javautilfunction">6. Functional Interfaces in Java (<code>java.util.function</code>)</h2>
<table>
<thead><tr>
<th>Interface</th>
<th>Method</th>
<th>Description</th>
<th>Example</th>
</tr></thead><tbody>
<tr>
<td><code>Supplier&lt;T&gt;</code></td>
<td><code>get()</code></td>
<td>Supplies a result with no input</td>
<td><code>Supplier&lt;String&gt; s = () -&gt; &quot;Hello&quot;;</code></td>
</tr>
<tr>
<td><code>Consumer&lt;T&gt;</code></td>
<td><code>accept(T)</code></td>
<td>Consumes an input without returning a result</td>
<td><code>Consumer&lt;String&gt; c = s -&gt; System.out.println(s);</code></td>
</tr>
<tr>
<td><code>Predicate&lt;T&gt;</code></td>
<td><code>test(T)</code></td>
<td>Returns a boolean based on input condition</td>
<td><code>Predicate&lt;Integer&gt; p = x -&gt; x &gt; 10;</code></td>
</tr>
<tr>
<td><code>UnaryOperator&lt;T&gt;</code></td>
<td><code>apply(T)</code></td>
<td>Takes one argument, returns same type</td>
<td><code>UnaryOperator&lt;Integer&gt; square = x -&gt; x * x;</code></td>
</tr>
<tr>
<td><code>BinaryOperator&lt;T&gt;</code></td>
<td><code>apply(T, T)</code></td>
<td>Takes two arguments of same type, returns same type</td>
<td><code>BinaryOperator&lt;Integer&gt; add = (a,b) -&gt; a + b;</code></td>
</tr>
</tbody></table>
<hr>
<h2 id="7-comparable-vs-comparator">7. Comparable vs Comparator</h2>
<table>
<thead><tr>
<th>Comparable</th>
<th>Comparator</th>
</tr></thead><tbody>
<tr>
<td>Single sort logic (<code>compareTo</code>)</td>
<td>Multiple sort logic (<code>compare</code>)</td>
</tr>
<tr>
<td>Affects the original class (must modify class)</td>
<td>Doesn&#x27;t modify original class</td>
</tr>
<tr>
<td>Used when default natural ordering is sufficient</td>
<td>Used when custom sort logic is needed</td>
</tr>
</tbody></table>
<p><strong>Example:</strong></p>
<pre><code class="language-java">
// Comparable
class Student implements Comparable&lt;Student&gt; {
    int age;
    public int compareTo(Student s) {
        return this.age - s.age;
    }
}

// Comparator
Comparator&lt;Student&gt; nameComparator = (s1, s2) -&gt; s1.name.compareTo(s2.name);
</code></pre>
<hr>
<h2 id="8-implements-vs-extends">8. <code>implements</code> vs <code>extends</code></h2>
<table>
<thead><tr>
<th>Keyword</th>
<th>Used For</th>
<th>Supports Multiple Inheritance</th>
</tr></thead><tbody>
<tr>
<td><code>implements</code></td>
<td>Interface implementation</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><code>extends</code></td>
<td>Class inheritance</td>
<td>❌ No (only one class)</td>
</tr>
</tbody></table>
<hr>
<h2 id="9-interface-vs-abstract-class">9. Interface vs Abstract Class</h2>
<table>
<thead><tr>
<th>Feature</th>
<th>Interface</th>
<th>Abstract Class</th>
</tr></thead><tbody>
<tr>
<td>Methods</td>
<td>Only abstract (Java 7), default/static (Java 8+)</td>
<td>Abstract and concrete methods</td>
</tr>
<tr>
<td>Multiple Inheritance</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td>Constructor</td>
<td>Not allowed</td>
<td>Can have constructors</td>
</tr>
<tr>
<td>main() method</td>
<td>❌ Cannot have main</td>
<td>✅ Can have main</td>
</tr>
<tr>
<td>Access Modifiers</td>
<td>All methods are <code>public</code></td>
<td>Can have any access modifier</td>
</tr>
</tbody></table>
<h3 id="why-use-interface-over-abstract-class">Why use interface over abstract class?</h3>
<ul>
<li>To define a contract for implementation across unrelated classes.</li>
<li>Supports multiple inheritance for type polymorphism.</li>
</ul>
<hr>
<h2 id="10-cohesion-vs-coupling">10. Cohesion vs Coupling</h2>
<h3 id="coupling">Coupling</h3>
<p><strong>Definition:</strong> Degree of direct knowledge one class has of another.</p>
<table>
<thead><tr>
<th>Type</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td>Tight Coupling</td>
<td>Classes are highly dependent on each other. Difficult to test/modify.</td>
</tr>
<tr>
<td>Loose Coupling</td>
<td>Classes communicate via interfaces or abstraction. Promotes flexibility.</td>
</tr>
</tbody></table>
<p><strong>Example:</strong></p>
<blockquote>Spring Framework uses <strong>Dependency Injection (DI)</strong> to reduce tight coupling via POJOs.</blockquote>
<p><img src="../images/JavaBasic/Coupling.png" alt="Coupling.png"></p>
<hr>
<h3 id="cohesion">Cohesion</h3>
<p><strong>Definition:</strong> Degree to which class members (methods/variables) are related to each other.</p>
<table>
<thead><tr>
<th>Type</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td>High Cohesion</td>
<td>Class has well-defined responsibility, easier to maintain &amp; reuse.</td>
</tr>
<tr>
<td>Low Cohesion</td>
<td>Class handles many unrelated tasks. Difficult to understand and maintain.</td>
</tr>
</tbody></table>
<p><img src="../images/JavaBasic/Cohesion.png" alt="Cohesion.png"></p>
<p><strong>Comparison:</strong></p>
<ul>
<li><strong>High Cohesion</strong>: Specific, clear responsibilities. 👍</li>
<li><strong>Low Cohesion</strong>: General, unrelated logic. 👎</li>
</ul>
<h1 id="association-aggregation-and-composition-is-a-has-a">Association, Aggregation, and Composition (IS-A / HAS-A)</h1>
<details>
<summary>🔗 <strong>Association, Aggregation, and Composition (IS-A / HAS-A)</strong></summary>
<ul>
<li><strong>Association</strong>: General relationship between classes.</li>
<li><strong>Aggregation</strong>: &quot;Has-a&quot; relationship, loosely coupled.</li>
<li><strong>Composition</strong>: Strong ownership, tightly coupled.</li>
</ul>
<div class="mermaid">
flowchart TB
    A[Association] -- Weak (Loose Coupling) --&gt; B[Aggregation]
    A -- Strong (Tight Coupling) --&gt; C[Composition]
</div>
<p><img src="../images/JavaBasic/AssosiationAggregation.png" alt="AssosiationAggregation.png"></p>
<ul>
<li>Spring Boot MongoDB Join Example: <a href="https://www.javaprogramto.com/2020/05/spring-boot-data-mongodb-projections-aggregations.html">Link</a></li>
</ul>
<hr>
<h2 id="1-what-is-an-is-a-relationship">🧩 1. What is an “IS-A” relationship?</h2>
<p><strong>Definition:</strong></p>
<p>An <strong>IS-A</strong> relationship represents <strong>inheritance</strong> — one class <strong>inherits</strong> from another.</p>
<p>It means <strong>“is a kind of”</strong> relationship between two classes.</p>
<h3 id="example">➡️ Example</h3>
<pre><code class="language-java">
class Animal {
    void eat() {
        System.out.println(&quot;Animal eats food&quot;);
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println(&quot;Dog barks&quot;);
    }
}
</code></pre>
<p>Here:</p>
<ul>
<li><code>Dog</code> <strong>is an</strong> <code>Animal</code></li>
<li>So, the <strong>IS-A relationship</strong> exists between <code>Dog</code> and <code>Animal</code>.</li>
</ul>
<p>✅ We can write:</p>
<pre><code class="language-java">
Dog d = new Dog();
d.eat(); // Inherited from Animal
</code></pre>
<h3 id="conceptually">🧠 Conceptually:</h3>
<ul>
<li>The subclass (child) <strong>inherits</strong> the behavior and properties of the parent.</li>
<li>It helps achieve <strong>code reuse</strong> and <strong>polymorphism</strong>.</li>
</ul>
<h4 id="ascii-diagram">🪶 ASCII diagram:</h4>
<pre><code class="language-">
   Animal
     ↑
     |
    Dog
</code></pre>
<p>👉 <code>Dog IS-A Animal</code></p>
<hr>
<h2 id="2-what-is-a-has-a-relationship">🧩 2. What is a “HAS-A” relationship?</h2>
<p><strong>Definition:</strong></p>
<p>A <strong>HAS-A</strong> relationship represents <strong>composition</strong> or <strong>aggregation</strong> — one class <strong>contains</strong> another class as a member.</p>
<p>It means <strong>“has a”</strong> or <strong>“contains a”</strong> relationship.</p>
<h3 id="example">➡️ Example</h3>
<pre><code class="language-java">
class Engine {
    void start() {
        System.out.println(&quot;Engine starts&quot;);
    }
}

class Car {
    private Engine engine = new Engine();  // Car HAS-A Engine

    void startCar() {
        engine.start();
        System.out.println(&quot;Car is running&quot;);
    }
}
</code></pre>
<p>Here:</p>
<ul>
<li><code>Car</code> <strong>has an</strong> <code>Engine</code>.</li>
<li>The <strong>HAS-A relationship</strong> exists between <code>Car</code> and <code>Engine</code>.</li>
</ul>
<p>✅ We can write:</p>
<pre><code class="language-java">
Car car = new Car();
car.startCar();
</code></pre>
<h3 id="conceptually">🧠 Conceptually:</h3>
<ul>
<li>One class <strong>uses or contains</strong> another class.</li>
<li>It’s <strong>composition</strong> if the contained object’s lifetime depends on the container.</li>
</ul>
<p>  Example: A <code>Car</code>’s <code>Engine</code> exists only as long as the <code>Car</code> exists.</p>
<ul>
<li>It’s <strong>aggregation</strong> if they can exist independently.</li>
</ul>
<p>  Example: A <code>Department</code> <strong>has many</strong> <code>Employees</code>, but <code>Employee</code> can exist without <code>Department</code>.</p>
<h4 id="ascii-diagram">🪶 ASCII diagram:</h4>
<pre><code class="language-">
Car -----&gt; Engine
   (has-a)
</code></pre>
<p>👉 <code>Car HAS-A Engine</code></p>
<hr>
<h4 id="summary-table">⚖️ Summary Table</h4>
<table>
<thead><tr>
<th>Concept</th>
<th>Relationship Type</th>
<th>Implementation</th>
<th>Keyword Used</th>
<th>Example</th>
<th>Meaning</th>
</tr></thead><tbody>
<tr>
<td><strong>IS-A</strong></td>
<td>Inheritance</td>
<td><code>extends</code> / <code>implements</code></td>
<td><code>extends</code>, <code>implements</code></td>
<td><code>Dog extends Animal</code></td>
<td>“Dog is an Animal”</td>
</tr>
<tr>
<td><strong>HAS-A</strong></td>
<td>Composition / Aggregation</td>
<td>Member object</td>
<td>Instance field</td>
<td><code>Car has Engine</code></td>
<td>“Car has an Engine”</td>
</tr>
</tbody></table>
<hr>
<p><strong>✅ Key Takeaway</strong></p>
<ul>
<li>Use <strong>IS-A</strong> when one class is a specialized type of another → inheritance.</li>
</ul>
<p>  Example: <code>class Manager extends Employee</code></p>
<ul>
<li>Use <strong>HAS-A</strong> when one class uses or contains another → composition.</li>
</ul>
<p>  Example: <code>class Employee { Address address; }</code></p>
<hr>
<p><strong>difference between Composition and Aggregation</strong>,</p>
<p>which are the <strong>two types of “HAS-A” relationships</strong> in Java.</p>
<hr>
<h1 id="has-a-relationship-types-in-java">🧩 HAS-A Relationship Types in Java</h1>
<p>A “HAS-A” relationship means <strong>one class contains another</strong>.</p>
<p>But <strong>how tightly</strong> one class owns the other defines whether it’s:</p>
<ul>
<li><strong>Composition</strong> (strong ownership)</li>
<li><strong>Aggregation</strong> (weak ownership)</li>
</ul>
<hr>
<h2 id="1-composition-strong-has-a-relationship">⚙️ 1. Composition — <em>Strong HAS-A relationship</em></h2>
<p><strong>Definition:</strong></p>
<p>When one class <strong>owns</strong> another class completely —</p>
<p>the contained object <strong>cannot exist independently</strong> of the container.</p>
<ul>
<li><strong>Lifetime is dependent:</strong></li>
</ul>
<p>  If the container object is destroyed, the contained object is also destroyed.</p>
<h3 id="example-car-has-an-engine">➡️ Example: Car <strong>has</strong> an Engine</h3>
<pre><code class="language-java">
class Engine {
    void start() {
        System.out.println(&quot;Engine starts&quot;);
    }
}

class Car {
    private Engine engine; // Composition

    Car() {
        engine = new Engine(); // Car creates and owns Engine
    }

    void startCar() {
        engine.start();
        System.out.println(&quot;Car is running&quot;);
    }
}
</code></pre>
<p>✅ <strong>Explanation:</strong></p>
<ul>
<li><code>Car</code> <strong>creates</strong> the <code>Engine</code> object.</li>
<li>If the <code>Car</code> object is destroyed → its <code>Engine</code> object also ceases to exist.</li>
<li><code>Engine</code>’s lifecycle is <strong>tied</strong> to <code>Car</code>.</li>
</ul>
<h4 id="ascii-diagram">🪶 ASCII Diagram</h4>
<pre><code class="language-">
[Car] ♦───&gt;[Engine]
   Composition (strong ownership)
</code></pre>
<p>Diamond (♦) denotes <em>composition</em> (from UML).</p>
<hr>
<h2 id="2-aggregation-weak-has-a-relationship">⚙️ 2. Aggregation — <em>Weak HAS-A relationship</em></h2>
<p><strong>Definition:</strong></p>
<p>When one class <strong>uses</strong> another class <strong>without owning it</strong>.</p>
<p>The contained object can <strong>exist independently</strong>.</p>
<ul>
<li><strong>Lifetime is independent:</strong></li>
</ul>
<p>  If the container is destroyed, the contained object still exists elsewhere.</p>
<h3 id="example-department-has-employees">➡️ Example: Department <strong>has</strong> Employees</h3>
<pre><code class="language-java">
class Employee {
    String name;
    Employee(String name) {
        this.name = name;
    }
}

class Department {
    private String deptName;
    private List&lt;Employee&gt; employees; // Aggregation

    Department(String deptName, List&lt;Employee&gt; employees) {
        this.deptName = deptName;
        this.employees = employees; // Injected from outside
    }

    void showEmployees() {
        for (Employee e : employees)
            System.out.println(e.name);
    }
}
</code></pre>
<p>✅ <strong>Explanation:</strong></p>
<ul>
<li><code>Employee</code> objects are created <strong>outside</strong> the <code>Department</code>.</li>
<li><code>Department</code> just <strong>uses a reference</strong> to them.</li>
<li>Even if the <code>Department</code> is deleted, employees can exist independently.</li>
</ul>
<h4 id="ascii-diagram">🪶 ASCII Diagram</h4>
<pre><code class="language-">
[Department] ◇───&gt;[Employee]
    Aggregation (weak ownership)
</code></pre>
<p>Hollow diamond (◇) denotes <em>aggregation</em> (from UML).</p>
<hr>
<h3 id="quick-comparison-table">🧠 Quick Comparison Table</h3>
<table>
<thead><tr>
<th>Feature</th>
<th><strong>Composition</strong></th>
<th><strong>Aggregation</strong></th>
</tr></thead><tbody>
<tr>
<td><strong>Type</strong></td>
<td>Strong HAS-A</td>
<td>Weak HAS-A</td>
</tr>
<tr>
<td><strong>Ownership</strong></td>
<td>One class <strong>owns</strong> the other</td>
<td>One class <strong>uses</strong> the other</td>
</tr>
<tr>
<td><strong>Object lifetime</strong></td>
<td>Dependent – contained object dies with container</td>
<td>Independent – contained object lives on</td>
</tr>
<tr>
<td><strong>Instantiation</strong></td>
<td>Usually created inside container</td>
<td>Usually passed in from outside</td>
</tr>
<tr>
<td><strong>Example</strong></td>
<td><code>Car</code> has an <code>Engine</code></td>
<td><code>Department</code> has <code>Employees</code></td>
</tr>
<tr>
<td><strong>UML symbol</strong></td>
<td>♦ (filled diamond)</td>
<td>◇ (hollow diamond)</td>
</tr>
</tbody></table>
<hr>
<h4 id="summary-diagram-all-relationships">🧩 Summary Diagram (All Relationships)</h4>
<pre><code class="language-">
             ┌──────────────┐
             │   Animal     │
             └──────▲───────┘
                    │ IS-A
             ┌──────┴───────┐
             │     Dog      │
             └──────────────┘

             ┌──────────────┐
             │     Car      │
             └──────♦───────┘   Composition
                    │
             ┌──────┴───────┐
             │    Engine    │
             └──────────────┘

             ┌──────────────┐
             │ Department   │
             └──────◇───────┘   Aggregation
                    │
             ┌──────┴───────┐
             │  Employee    │
             └──────────────┘
</code></pre>
<hr>
<p>✅ <strong>In short:</strong></p>
<ul>
<li><strong>IS-A</strong> → Inheritance (<code>extends</code> / <code>implements</code>)</li>
<li><strong>HAS-A (Composition)</strong> → Strong containment (one object <em>owns</em> another)</li>
<li><strong>HAS-A (Aggregation)</strong> → Weak containment (one object <em>uses</em> another)</li>
</ul>
</details>
<hr>
<h4 id="summary">Summary</h4>
<table>
<thead><tr>
<th>Concept</th>
<th>Goal</th>
</tr></thead><tbody>
<tr>
<td><strong>Polymorphism</strong></td>
<td>Same interface, different behavior</td>
</tr>
<tr>
<td><strong>Encapsulation</strong></td>
<td>Hide internal details</td>
</tr>
<tr>
<td><strong>Inheritance</strong></td>
<td>Code reuse, hierarchical logic</td>
</tr>
<tr>
<td><strong>Abstraction</strong></td>
<td>Define contract via interfaces/abstract classes</td>
</tr>
<tr>
<td><strong>Loose Coupling</strong></td>
<td>Better modularity via DI/Interfaces</td>
</tr>
<tr>
<td><strong>High Cohesion</strong></td>
<td>Clear responsibility, easier maintenance</td>
</tr>
</tbody></table>
<hr>
<h1 id="java-collections-framework-guide">🧱 Java Collections Framework Guide</h1>
<h2 id="why-collections-framework">🔍 Why Collections Framework?</h2>
<ul>
<li>Avoids writing boilerplate data structure logic (list, set, map, queue).</li>
<li>Offers ready-to-use implementations and utility methods.</li>
<li>Ensures standardization across all Java applications.</li>
</ul>
<hr>
<p><img src="../images/JavaBasic/ListQueueSet.png" alt="Collection"></p>
<hr>
<h3 id="collections-hierarchy-overview">🌐 Collections Hierarchy Overview</h3>
<div class="mermaid">
flowchart TD

    %% Iterable hierarchy
    Iterable[&quot;Iterable&quot;]
    Iterable --&gt; Collection[&quot;Collection&quot;]

    Collection --&gt; List[&quot;List&quot;]
    List --&gt; ArrayList[&quot;ArrayList&quot;]
    List --&gt; LinkedList[&quot;LinkedList&quot;]
    List --&gt; Vector[&quot;Vector&quot;]
    Vector --&gt; Stack[&quot;Stack&quot;]

    Collection --&gt; Set[&quot;Set&quot;]
    Set --&gt; HashSet[&quot;HashSet&quot;]
    Set --&gt; LinkedHashSet[&quot;LinkedHashSet&quot;]
    Set --&gt; TreeSet[&quot;TreeSet&quot;]

    Collection --&gt; Queue[&quot;Queue&quot;]
    Queue --&gt; PriorityQueue[&quot;PriorityQueue&quot;]
    Queue --&gt; Deque[&quot;Deque&quot;]
    Deque --&gt; ArrayDeque[&quot;ArrayDeque&quot;]

    %% Map hierarchy
    Map[&quot;Map (Not part of Collection)&quot;]
    Map --&gt; HashMap[&quot;HashMap&quot;]
    HashMap --&gt; LinkedHashMap[&quot;LinkedHashMap&quot;]
    Map --&gt; TreeMap[&quot;TreeMap&quot;]
</div>
<hr>
<h3 id="interactive-decision-flowchart-pick-the-right-collection">🧭 Interactive Decision Flowchart: Pick the Right Collection</h3>
<div class="mermaid">
flowchart TD

    Start([&quot;Start&quot;])
    Start --&gt; NeedKeyValue{&quot;Do you need key-value pairs?&quot;}

    %% Map branch
    NeedKeyValue -- Yes --&gt; UseMap[&quot;Use a Map&quot;]
    UseMap --&gt; KeysSorted{&quot;Do keys need to be sorted?&quot;}
    KeysSorted -- Yes --&gt; TreeMap[&quot;TreeMap&quot;]
    KeysSorted -- No --&gt; PreserveOrderMap{&quot;Preserve insertion order?&quot;}
    PreserveOrderMap -- Yes --&gt; LinkedHashMap[&quot;LinkedHashMap&quot;]
    PreserveOrderMap -- No --&gt; HashMap[&quot;HashMap&quot;]

    %% Collection branch
    NeedKeyValue -- No --&gt; CollectionSide[&quot;Move to Collection (List or Set)&quot;]
    CollectionSide --&gt; AllowDuplicates{&quot;Allow duplicates?&quot;}

    %% List branch
    AllowDuplicates -- Yes --&gt; UseList[&quot;Use a List&quot;]
    UseList --&gt; RandomAccess{&quot;Need random access by index?&quot;}
    RandomAccess -- Yes --&gt; ArrayList[&quot;ArrayList&quot;]
    RandomAccess -- No --&gt; LinkedList[&quot;LinkedList&quot;]

    %% Set branch
    AllowDuplicates -- No --&gt; UseSet[&quot;Use a Set&quot;]
    UseSet --&gt; SortedSet{&quot;Need elements sorted?&quot;}
    SortedSet -- Yes --&gt; TreeSet[&quot;TreeSet&quot;]
    SortedSet -- No --&gt; PreserveOrderSet{&quot;Preserve insertion order?&quot;}
    PreserveOrderSet -- Yes --&gt; LinkedHashSet[&quot;LinkedHashSet&quot;]
    PreserveOrderSet -- No --&gt; HashSet[&quot;HashSet&quot;]

    %% Thread-safety check
    AfterSelection[&quot;After selecting collection&quot;] --&gt; ThreadSafe{&quot;Need thread safety?&quot;}
    ThreadSafe -- Yes --&gt; ConcurrentOptions[&quot;Use concurrent/synchronized alternatives:&lt;br/&gt;- ConcurrentHashMap&lt;br/&gt;- CopyOnWriteArrayList&lt;br/&gt;- Collections.synchronizedSet(...)&quot;]
    ThreadSafe -- No --&gt; UseDefault[&quot;Use as-is (default)&quot;]

    %% Connections
    TreeMap --&gt; AfterSelection
    LinkedHashMap --&gt; AfterSelection
    HashMap --&gt; AfterSelection
    ArrayList --&gt; AfterSelection
    LinkedList --&gt; AfterSelection
    TreeSet --&gt; AfterSelection
    LinkedHashSet --&gt; AfterSelection
    HashSet --&gt; AfterSelection
</div>
<hr>
<h4 id="example-scenarios">🧠 Example Scenarios</h4>
<h4 id="1-you-need-to-store-data-with-keys-and-values-and-want-to-sort-them-by-keys">1. You need to store data with keys and values and want to sort them by keys:</h4>
<p>→ <code>TreeMap</code></p>
<h4 id="2-you-want-to-store-a-list-of-names-with-duplicates-and-access-by-index">2. You want to store a list of names with duplicates and access by index:</h4>
<p>→ <code>ArrayList</code></p>
<h4 id="3-you-want-to-store-a-set-of-unique-cities-and-order-doesnt-matter">3. You want to store a set of unique cities, and order doesn’t matter:</h4>
<p>→ <code>HashSet</code></p>
<h4 id="4-you-want-to-store-key-value-pairs-with-insertion-order-preserved-and-need-thread-safety">4. You want to store key-value pairs with insertion order preserved and need thread safety:</h4>
<p>→ <code>LinkedHashMap</code> + <code>Collections.synchronizedMap(...)</code></p>
<hr>
<h4 id="summary-table">🧰 Summary Table</h4>
<table>
<thead><tr>
<th>Need</th>
<th>Collection</th>
</tr></thead><tbody>
<tr>
<td>Key-value with sorted keys</td>
<td><code>TreeMap</code></td>
</tr>
<tr>
<td>Key-value with insertion order</td>
<td><code>LinkedHashMap</code></td>
</tr>
<tr>
<td>Simple key-value (no order)</td>
<td><code>HashMap</code></td>
</tr>
<tr>
<td>List with index access</td>
<td><code>ArrayList</code></td>
</tr>
<tr>
<td>List without index priority</td>
<td><code>LinkedList</code></td>
</tr>
<tr>
<td>Unique, sorted elements</td>
<td><code>TreeSet</code></td>
</tr>
<tr>
<td>Unique, insertion order</td>
<td><code>LinkedHashSet</code></td>
</tr>
<tr>
<td>Unique, no order</td>
<td><code>HashSet</code></td>
</tr>
<tr>
<td>Thread safety</td>
<td><code>ConcurrentHashMap</code>, <code>CopyOnWriteArrayList</code>, <code>synchronizedMap</code>, etc.</td>
</tr>
</tbody></table>
<hr>
<h2 id="core-interfaces-and-key-differences">🛠 Core Interfaces and Key Differences</h2>
<h3 id="iterable-vs-collection">Iterable vs Collection</h3>
<table>
<thead><tr>
<th>Interface</th>
<th>Role</th>
</tr></thead><tbody>
<tr>
<td><code>Iterable</code></td>
<td>Root interface for iteration</td>
</tr>
<tr>
<td><code>Collection</code></td>
<td>Base interface for Lists, Sets, Queues</td>
</tr>
</tbody></table>
<h3 id="iterator-vs-enumeration">Iterator vs Enumeration</h3>
<table>
<thead><tr>
<th>Feature</th>
<th>Iterator</th>
<th>Enumeration</th>
</tr></thead><tbody>
<tr>
<td>Remove Element</td>
<td>✅ Allows remove() during traversal</td>
<td>❌ Read-only; cannot modify</td>
</tr>
<tr>
<td>Coverage</td>
<td>Universal cursor (works with all collections)</td>
<td>Only for legacy classes like Vector, Hashtable</td>
</tr>
<tr>
<td>Method Support</td>
<td>hasNext(), next(), remove()</td>
<td>hasMoreElements(), nextElement()</td>
</tr>
<tr>
<td>Direction</td>
<td>Forward only</td>
<td>Forward only</td>
</tr>
<tr>
<td>Used For</td>
<td>All modern collections</td>
<td>Legacy (Vector, Hashtable)</td>
</tr>
<tr>
<td>Thread Safety</td>
<td>Not thread-safe by default</td>
<td>❌ Not thread-safe</td>
</tr>
<tr>
<td>Fail-fast</td>
<td>✅</td>
<td>❌</td>
</tr>
</tbody></table>
<hr>
<details>
<summary>📦 Utility Classes and Interfaces</summary>
<h3 id="collection-interface-methods">Collection Interface Methods</h3>
<ul>
<li><code>add(E e)</code>, <code>remove(Object o)</code></li>
<li><code>addAll()</code>, <code>removeAll()</code></li>
<li><code>size()</code>, <code>isEmpty()</code></li>
<li><code>clear()</code></li>
<li><code>stream()</code></li>
</ul>
<h3 id="iterator-interface">Iterator Interface</h3>
<ul>
<li><code>hasNext()</code>, <code>next()</code>, <code>remove()</code></li>
</ul>
<h3 id="iterable-interface">Iterable Interface</h3>
<ul>
<li><code>iterator()</code> — only method</li>
</ul>
</details>
<hr>
<h2 id="list-implementations">🧩 List Implementations</h2>
<details>
<summary><strong>📋 List Implementations</strong></summary>
<table>
<thead><tr>
<th>Type</th>
<th>Order Maintained</th>
<th>Sorted</th>
<th>Allows Duplicates</th>
<th>Thread Safe</th>
</tr></thead><tbody>
<tr>
<td>ArrayList</td>
<td>✅ Yes</td>
<td>❌ No</td>
<td>✅ Yes</td>
<td>❌ No</td>
</tr>
<tr>
<td>LinkedList</td>
<td>✅ Yes</td>
<td>❌ No</td>
<td>✅ Yes</td>
<td>❌ No</td>
</tr>
<tr>
<td>Vector</td>
<td>✅ Yes</td>
<td>❌ No</td>
<td>✅ Yes</td>
<td>✅ Yes</td>
</tr>
<tr>
<td>Stack</td>
<td>✅ Yes</td>
<td>❌ No</td>
<td>✅ Yes</td>
<td>✅ Yes (inherited from Vector)</td>
</tr>
</tbody></table>
<h3 id="arraylist">ArrayList</h3>
<ul>
<li>Backed by <strong>resizable array</strong></li>
<li>Random access supported (O(1))</li>
<li>Not synchronized</li>
</ul>
<h3 id="linkedlist">LinkedList</h3>
<ul>
<li>Doubly linked list</li>
<li>Insertion/deletion faster (O(1) at ends)</li>
<li>Slower random access (O(n))</li>
</ul>
<p><img src="../images/JavaBasic/ArrayListVsLinkedList.png" alt="ArrayListVsLinkedList"></p>
<p><img src="../images/JavaBasic/singlyLinkedList.png" alt="singlyLinkedList"></p>
<p><img src="../images/JavaBasic/doublyLinkedList.png" alt="doublyLinkedList"></p>
<p><img src="../images/JavaBasic/singlyVsDouble1.png" alt="singlyVsDouble1"></p>
<p><img src="../images/JavaBasic/singlyVsDouble2.png" alt="singlyVsDouble2"></p>
<h3 id="vector-legacy">Vector (Legacy)</h3>
<ul>
<li>Synchronized version of ArrayList</li>
<li>Avoid unless thread-safe list is needed</li>
</ul>
<h3 id="stack-legacy">Stack (Legacy)</h3>
<ul>
<li>LIFO structure</li>
<li>Prefer <code>Deque</code> (like <code>ArrayDeque</code>) over <code>Stack</code></li>
</ul>
</details>
<hr>
<h2 id="queue-implementations">🌀 Queue Implementations</h2>
<details>
<summary><strong>🔄 Queue & Deque</strong></summary>
<table>
<thead><tr>
<th>Interface</th>
<th>Implementations</th>
<th>Notes</th>
</tr></thead><tbody>
<tr>
<td><code>Queue</code></td>
<td><code>LinkedList</code>, <code>PriorityQueue</code></td>
<td>FIFO, priority-based</td>
</tr>
<tr>
<td><code>Deque</code></td>
<td><code>ArrayDeque</code>, <code>LinkedList</code></td>
<td>Double-ended (add/remove from both ends)</td>
</tr>
<tr>
<td><code>BlockingQueue</code></td>
<td><code>LinkedBlockingQueue</code>, <code>ArrayBlockingQueue</code></td>
<td>Thread-safe queues</td>
</tr>
</tbody></table>
<table>
<thead><tr>
<th>Type</th>
<th>Order Maintained</th>
<th>Sorted</th>
<th>Allows Duplicates</th>
<th>Thread Safe</th>
<th>Nulls Allowed</th>
</tr></thead><tbody>
<tr>
<td><strong>Queue (Interface)</strong></td>
<td>✅ FIFO</td>
<td>❌ No</td>
<td>✅ Yes</td>
<td>Depends on implementation</td>
<td>Depends on implementation</td>
</tr>
<tr>
<td><strong>Deque (Interface)</strong></td>
<td>✅ Ends</td>
<td>❌ No</td>
<td>✅ Yes</td>
<td>Depends on implementation</td>
<td>Depends on implementation</td>
</tr>
<tr>
<td><strong>ArrayDeque</strong></td>
<td>✅ Yes</td>
<td>❌ No</td>
<td>✅ Yes</td>
<td>❌ No</td>
<td><strong>No nulls</strong></td>
</tr>
<tr>
<td><strong>LinkedList (as Queue)</strong></td>
<td>✅ Yes</td>
<td>❌ No</td>
<td>✅ Yes</td>
<td>❌ No</td>
<td><strong>Multiple nulls</strong></td>
</tr>
<tr>
<td><strong>PriorityQueue</strong></td>
<td>✅ Partial (Heap)</td>
<td>✅ Yes</td>
<td>✅ Yes</td>
<td>❌ No</td>
<td><strong>No nulls</strong></td>
</tr>
<tr>
<td><strong>ConcurrentLinkedQueue</strong></td>
<td>✅ Yes</td>
<td>❌ No</td>
<td>✅ Yes</td>
<td>✅ Yes</td>
<td><strong>No nulls</strong></td>
</tr>
<tr>
<td><strong>BlockingQueue (e.g. LinkedBlockingQueue)</strong></td>
<td>✅ Yes</td>
<td>❌ No</td>
<td>✅ Yes</td>
<td>✅ Yes</td>
<td><strong>No nulls</strong></td>
</tr>
</tbody></table>
<hr>
<p>📌 <strong>Key Notes</strong>:</p>
<ul>
<li>Most <strong>concurrent queue implementations</strong> in Java <strong>do not allow nulls</strong> (they throw <code>NullPointerException</code> if you try to insert).</li>
<li>Only <strong>LinkedList (when used as Queue/Deque)</strong> permits <strong>multiple null elements</strong>.</li>
</ul>
<hr>
</details>
<hr>
<h2 id="set-implementations">🎯 Set Implementations</h2>
<details>
<summary><strong>🚫 Set Implementations</strong></summary>
<h3 id="hashset">HashSet</h3>
<ul>
<li>Unordered, unique elements</li>
<li>Backed by HashMap</li>
<li>Average time: O(1)</li>
</ul>
<h3 id="linkedhashset">LinkedHashSet</h3>
<ul>
<li>Ordered by insertion</li>
<li>Slightly more memory than HashSet</li>
</ul>
<h3 id="treeset">TreeSet</h3>
<ul>
<li>Sorted order (natural or custom Comparator)</li>
<li>Backed by Red-Black Tree</li>
<li>Time complexity: O(log n)</li>
</ul>
<table>
<thead><tr>
<th>Type</th>
<th>Order Maintained</th>
<th>Sorted</th>
<th>Allows Duplicates</th>
<th>Thread Safe</th>
<th>Nulls Allowed</th>
</tr></thead><tbody>
<tr>
<td><strong>HashSet</strong></td>
<td>❌</td>
<td>❌</td>
<td>❌</td>
<td>❌</td>
<td><strong>One null</strong></td>
</tr>
<tr>
<td><strong>LinkedHashSet</strong></td>
<td>✅</td>
<td>❌</td>
<td>❌</td>
<td>❌</td>
<td><strong>One null</strong></td>
</tr>
<tr>
<td><strong>TreeSet</strong></td>
<td>✅ (Sorted)</td>
<td>✅</td>
<td>❌</td>
<td>❌</td>
<td><strong>None</strong> (throws <code>NullPointerException</code> if you add null, since it uses <code>Comparable</code> or <code>Comparator</code>)</td>
</tr>
</tbody></table>
</details>
<hr>
<h2 id="map-implementations">🧮 Map Implementations</h2>
<table>
<thead><tr>
<th>Type</th>
<th>Ordered?</th>
<th>Thread Safe</th>
<th>Notes</th>
<th>Nulls Allowed</th>
</tr></thead><tbody>
<tr>
<td><strong>HashMap</strong></td>
<td>❌</td>
<td>❌</td>
<td>Most used, allows one null key</td>
<td><strong>1 null key, multiple null values</strong></td>
</tr>
<tr>
<td><strong>LinkedHashMap</strong></td>
<td>✅</td>
<td>❌</td>
<td>Preserves insertion order</td>
<td><strong>1 null key, multiple null values</strong></td>
</tr>
<tr>
<td><strong>TreeMap</strong></td>
<td>✅ (Sorted)</td>
<td>❌</td>
<td>Sorted by natural/comparator key</td>
<td><strong>No null keys, multiple null values</strong> (unless comparator supports nulls explicitly)</td>
</tr>
<tr>
<td><strong>Hashtable</strong></td>
<td>❌</td>
<td>✅ (legacy)</td>
<td>Slower, use only for legacy support</td>
<td><strong>No null keys, no null values</strong></td>
</tr>
<tr>
<td><strong>ConcurrentHashMap</strong></td>
<td>❌</td>
<td>✅ (modern)</td>
<td>Thread-safe, no null keys allowed</td>
<td><strong>No null keys, no null values</strong></td>
</tr>
</tbody></table>
<hr>
<h3 id="key-differences-between-hashmap-and-hashtable">🔑 <strong>Key Differences Between <code>HashMap</code> and <code>Hashtable</code></strong></h3>
<table>
<thead><tr>
<th>Feature</th>
<th><code>HashMap</code></th>
<th><code>Hashtable</code></th>
</tr></thead><tbody>
<tr>
<td><strong>Thread-safety</strong></td>
<td>Not synchronized (not thread-safe). Must be synchronized externally if used in multithreaded code.</td>
<td>Synchronized (thread-safe for concurrent access).</td>
</tr>
<tr>
<td><strong>Performance</strong></td>
<td>Faster, since no synchronization overhead.</td>
<td>Slower, due to synchronized methods.</td>
</tr>
<tr>
<td><strong>Null Keys/Values</strong></td>
<td>Allows <strong>one <code>null</code> key</strong> and multiple <code>null</code> values.</td>
<td><strong>Does not allow</strong> <code>null</code> keys or <code>null</code> values.</td>
</tr>
<tr>
<td><strong>Legacy vs Modern</strong></td>
<td>Introduced in <strong>Java 1.2</strong> as part of the Collections Framework.</td>
<td>Legacy class from <strong>Java 1.0</strong>, prior to Collections Framework.</td>
</tr>
<tr>
<td><strong>Iteration</strong></td>
<td>Iterators are <strong>fail-fast</strong> (throw <code>ConcurrentModificationException</code> if modified while iterating).</td>
<td>Enumerators are <strong>not fail-fast</strong>.</td>
</tr>
<tr>
<td><strong>Use in new code</strong></td>
<td>Recommended for most cases (unless thread-safety is needed).</td>
<td>Considered obsolete; replaced by <code>ConcurrentHashMap</code> for thread-safe alternatives.</td>
</tr>
</tbody></table>
<hr>
<h3 id="when-to-use">✅ <strong>When to Use</strong></h3>
<ul>
<li><strong>Use <code>HashMap</code></strong> → When you don’t need synchronization and want better performance.</li>
<li><strong>Use <code>ConcurrentHashMap</code></strong> → Instead of <code>Hashtable</code> if you need thread safety in modern Java.</li>
<li><strong>Avoid <code>Hashtable</code></strong> → Kept mostly for backward compatibility with older codebases.</li>
</ul>
<hr>
<h3 id="example">📌 Example</h3>
<pre><code class="language-java">
import java.util.*;

public class MapExample {
    public static void main(String[] args) {
        // HashMap
        Map&lt;Integer, String&gt; hashMap = new HashMap&lt;&gt;();
        hashMap.put(1, &quot;Apple&quot;);
        hashMap.put(2, &quot;Banana&quot;);
        hashMap.put(null, &quot;Cherry&quot;); // null key allowed
        hashMap.put(3, null);        // null value allowed
        System.out.println(&quot;HashMap: &quot; + hashMap);

        // Hashtable
        Map&lt;Integer, String&gt; hashtable = new Hashtable&lt;&gt;();
        hashtable.put(1, &quot;Dog&quot;);
        hashtable.put(2, &quot;Cat&quot;);
        // hashtable.put(null, &quot;Fish&quot;); // ❌ NullPointerException
        // hashtable.put(3, null);      // ❌ NullPointerException
        System.out.println(&quot;Hashtable: &quot; + hashtable);
    }
}
</code></pre>
<hr>
<h2 id="thread-safety-comparison">🧠 Thread Safety Comparison</h2>
<table>
<thead><tr>
<th>Collection</th>
<th>Thread Safe?</th>
<th>Alternative</th>
</tr></thead><tbody>
<tr>
<td>ArrayList</td>
<td>❌</td>
<td><code>CopyOnWriteArrayList</code></td>
</tr>
<tr>
<td>HashMap</td>
<td>❌</td>
<td><code>ConcurrentHashMap</code></td>
</tr>
<tr>
<td>HashSet</td>
<td>❌</td>
<td><code>Collections.synchronizedSet()</code></td>
</tr>
<tr>
<td>TreeSet</td>
<td>❌</td>
<td><code>ConcurrentSkipListSet</code> (via concurrent pkg)</td>
</tr>
<tr>
<td>Stack</td>
<td>✅ (legacy)</td>
<td>Prefer <code>ArrayDeque</code></td>
</tr>
<tr>
<td>Vector</td>
<td>✅</td>
<td>Use cautiously (legacy)</td>
</tr>
</tbody></table>
<hr>
<h2 id="hashcode-and-equals-in-hash-based-collections">🧠 <code>hashCode()</code> and <code>equals()</code> in Hash-Based Collections</h2>
<details>
<summary><strong>🧠 equals() vs == vs hashCode()</strong></summary>
<p><img src="../images/JavaBasic/equalsHashCode.png" alt="equalsHashCode"></p>
<p><img src="../images/JavaBasic/equalsVsDoubleEqual.png" alt="equalsVsDoubleEqual"></p>
<ul>
<li>When used as keys in <code>HashMap</code> or elements in <code>HashSet</code>, override both.</li>
<li><strong>Contract:</strong></li>
</ul>
<ul>
<li>If <code>a.equals(b)</code> is true → <code>a.hashCode() == b.hashCode()</code> must be true</li>
<li>But the reverse isn&#x27;t mandatory.</li>
</ul>
<ul>
<li><code>==</code> → compares <strong>reference</strong> (memory address)</li>
<li><code>equals()</code> → compares <strong>value/content</strong></li>
<li><code>hashCode()</code> → used in hashing collections (<code>HashMap</code>, <code>HashSet</code>, etc.)</li>
</ul>
<p>Example:</p>
<pre><code class="language-java">
String a = &quot;hello&quot;;
String b = new String(&quot;hello&quot;);

System.out.println(a == b);        // false
System.out.println(a.equals(b));   // true
</code></pre>
<hr>
<h3 id="when-to-override-hashcode-and-equals"><strong>When to override <code>hashCode()</code> and <code>equals()</code></strong></h3>
<ul>
<li><strong>Objects are logically equal based on fields</strong></li>
<li>If two objects should be considered “equal” based on their content, not memory reference.</li>
<li>Example: two <code>Person</code> objects with the same <code>id</code> should be considered equal, even if they are different instances.</li>
</ul>
<pre><code class="language-java">
class Person {
    private int id;
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person)) return false;
        Person person = (Person) o;
        return id == person.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
</code></pre>
<hr>
<ul>
<li><strong>When using objects in hash-based collections</strong></li>
<li><strong><code>HashSet</code></strong>, <strong><code>HashMap</code></strong>, <strong><code>HashTable</code></strong> rely on <code>hashCode()</code> to locate objects.</li>
<li>If you override <code>equals()</code> but <strong>not</strong> <code>hashCode()</code>, hash-based collections may behave incorrectly (duplicate entries may appear).</li>
</ul>
<hr>
<ul>
<li><strong>When objects are keys in maps or elements in sets</strong></li>
<li>Example: using a <code>Person</code> as a key in <code>HashMap</code>:</li>
</ul>
<pre><code class="language-java">
Map&lt;Person, String&gt; map = new HashMap&lt;&gt;();
map.put(new Person(1, &quot;Alice&quot;), &quot;Engineer&quot;);
map.put(new Person(1, &quot;Alice&quot;), &quot;Manager&quot;); // Without proper equals &amp; hashCode, both entries may exist
</code></pre>
<ul>
<li>Correct <code>equals</code> + <code>hashCode</code> ensures that the second <code>put</code> <strong>replaces the first entry</strong>.</li>
</ul>
<hr>
<h3 id="rules"><strong>Rules</strong></h3>
<ul>
<li>If two objects are equal (<code>equals()</code>), they <strong>must have the same hash code</strong>.</li>
<li>If two objects have the same hash code, they <strong>may or may not be equal</strong>.</li>
<li>If you override <strong>one</strong>, you almost always override the <strong>other</strong>.</li>
</ul>
<hr>
<h3 id="when-you-dont-need-them"><strong>When you don’t need them</strong></h3>
<ul>
<li>For classes that are <strong>never used in hash-based collections</strong> or where <strong>reference equality (<code>==</code>) is sufficient</strong>, you don’t need to override them.</li>
</ul>
<hr>
<h3 id="how-it-works"><strong>How it works</strong></h3>
<ul>
<li>When you insert or lookup an object:</li>
<li><code>hashCode()</code> determines <strong>which bucket</strong> to look in.</li>
<li><code>equals()</code> checks if an <strong>equal object already exists</strong> in that bucket.</li>
</ul>
<ul>
<li><strong>HashSet</strong> → Only stores unique objects.</li>
<li>Uses both <code>hashCode()</code> + <code>equals()</code> to ensure uniqueness.</li>
</ul>
<ul>
<li><strong>HashMap</strong> → Key uniqueness works the same way.</li>
<li>If <code>equals()</code> returns true for an existing key, the value is replaced.</li>
</ul>
<hr>
<h3 id="example"><strong>Example</strong></h3>
<pre><code class="language-java">
Set&lt;Person&gt; set = new HashSet&lt;&gt;();
set.add(new Person(1, &quot;Alice&quot;));
set.add(new Person(1, &quot;Alice&quot;)); // Same ID, same equals/hashCode

System.out.println(set.size()); // 1
</code></pre>
<p>If <code>equals()</code> and <code>hashCode()</code> are <strong>not overridden</strong>, the two objects are treated as different → size = 2.</p>
<hr>
<p>✅ <strong>Interview takeaway</strong>:</p>
<ul>
<li><code>hashCode()</code> → <em>which bucket</em></li>
<li><code>equals()</code> → <em>is it the same object logically?</em></li>
<li>Together they prevent duplicates and ensure correct behavior.</li>
</ul>
</details>
<p><a href="https://youtu.be/7k0VYHuUF6g?si=7bOzb74JFvNW2yD8">INTERNAL WORKING OF HASHMAP</a></p>
<ul>
<li><strong>Threshold</strong></li>
<li><strong>Resizing</strong></li>
<li><strong>When a bucket becomes a linked list</strong></li>
<li><strong>When it is &quot;treeified&quot; (converted to a red-black tree)</strong></li>
</ul>
<p>This will help you clearly understand the <strong>internal working of Java’s <code>HashMap</code></strong>, including what happens <strong>before and after collisions</strong>, and how it maintains <strong>performance</strong>.</p>
<hr>
<h2 id="what-is-treeify-and-threshold">🔁 What Is Treeify and Threshold?</h2>
<table>
<thead><tr>
<th>Concept</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Threshold</strong></td>
<td>When the number of key-value pairs exceeds <code>capacity * loadFactor</code> (default <code>0.75</code>), the map <strong>resizes</strong> (doubles in size).</td>
</tr>
<tr>
<td><strong>Treeify</strong></td>
<td>When <strong>many entries exist in a single bucket</strong> (≥ 8 entries) <strong>and total capacity ≥ 64</strong>, the bucket is <strong>converted from a linked list to a red-black tree</strong>. This improves lookup performance from <strong>O(n)</strong> to <strong>O(log n)</strong>.</td>
</tr>
<tr>
<td><strong>Untreeify</strong></td>
<td>If the bucket size drops below 6 after deletions, the tree is <strong>converted back to a linked list</strong>.</td>
</tr>
</tbody></table>
<hr>
<h2 id="final-full-ascii-diagram-with-treeify-and-threshold">🧩 Final Full ASCII Diagram with Treeify and Threshold</h2>
<pre><code class="language-">
              +---------------------------+
              |   Object to be inserted   |
              +---------------------------+
                           |
                           v
                 1. Compute hashCode()
                           |
                           v
                 +-------------------+
                 | Hash bucket index |
                 +-------------------+
                           |
                           v
          --------------------------------------
          |         HashMap Table[] (Buckets)  |
          --------------------------------------
            |        |        |        |       
            v        v        v        v       
          Bucket0  Bucket1  Bucket2  Bucket3 ...
                               |
                               v
        +-----------------------------------------+
        |   Linked List of Nodes (same index)     |
        +-----------------------------------------+
        | Node1 (key1, value1) -&gt;                 |
        | Node2 (key2, value2) -&gt;                 |
        | Node3 (key3, value3) -&gt; ...             |
        | ...                                     |
        +-----------------------------------------+
                               |
          If entries in list &gt;= 8 AND capacity &gt;= 64
                               |
                               v
          +-------------------------------------+
          | Convert list to Red-Black Tree      |
          | (Treeify: O(n) → O(log n) access)   |
          +-------------------------------------+

⬇️

Now Bucket[i] points to:
        +------------------------------+
        |   Red-Black Tree (TreeNode) |
        +------------------------------+

          /        \
     key3           key1
       \            /
      key5        key2

(Organized for efficient search &amp; insert)

</code></pre>
<hr>
<h3 id="behind-the-scenes-key-conditions">⚙️ Behind the Scenes: Key Conditions</h3>
<table>
<thead><tr>
<th>Feature</th>
<th>Condition (When It Happens)</th>
</tr></thead><tbody>
<tr>
<td><strong>Resize</strong></td>
<td>When number of entries &gt; <code>capacity * loadFactor</code> (e.g., 12 entries in 16 buckets at 0.75 LF)</td>
</tr>
<tr>
<td><strong>Treeify</strong></td>
<td>When a single bucket has ≥ <strong>8 nodes</strong> and total capacity ≥ <strong>64</strong></td>
</tr>
<tr>
<td><strong>Linked List</strong></td>
<td>Default structure for collisions</td>
</tr>
<tr>
<td><strong>Untreeify</strong></td>
<td>When nodes in a tree &lt; <strong>6</strong>, convert back to list</td>
</tr>
</tbody></table>
<hr>
<h3 id="quick-summary-table">📊 Quick Summary Table</h3>
<table>
<thead><tr>
<th>Key Concept</th>
<th>Default Value / Behavior</th>
</tr></thead><tbody>
<tr>
<td>Initial Capacity</td>
<td>16 buckets</td>
</tr>
<tr>
<td>Load Factor</td>
<td>0.75</td>
</tr>
<tr>
<td>Resize Threshold</td>
<td>16 × 0.75 = 12 entries</td>
</tr>
<tr>
<td>Treeify Threshold</td>
<td>8 entries in a single bucket</td>
</tr>
<tr>
<td>Minimum Capacity to Treeify</td>
<td>64 buckets</td>
</tr>
<tr>
<td>Untreeify Threshold</td>
<td>&lt;6 entries in a tree bucket</td>
</tr>
</tbody></table>
<hr>
<h3 id="how-it-helps">🧪 How It Helps</h3>
<ul>
<li><strong>Resizing</strong> ensures the map doesn’t get too crowded → keeps lookup fast</li>
<li><strong>Treeify</strong> ensures performance doesn&#x27;t degrade with many hash collisions</li>
<li><strong>Linked list</strong> is simple and used unless there’s a high number of collisions</li>
</ul>
<hr>
<h3 id="final-notes">✅ Final Notes</h3>
<ul>
<li>Java 8 introduced <strong>treeification</strong> for performance improvements</li>
<li>You don’t see this as a user, but it <strong>silently keeps <code>HashMap</code> fast</strong></li>
<li>Good hash functions help avoid treeification altogether</li>
</ul>
<hr>
<h3 id="imagine-this-first">🧠 Imagine This First...</h3>
<p>Think of a <strong>HashMap like a school locker system</strong>:</p>
<ul>
<li>You have <strong>lots of lockers</strong> (slots or buckets).</li>
<li>Each locker has a <strong>number</strong>.</li>
<li>To store your stuff (data), you:</li>
</ul>
<ul>
<li>Use a <strong>key</strong> (like your name or ID)</li>
<li>The school gives you a <strong>locker number</strong> based on your key</li>
<li>Later, you can find your stuff by giving the <strong>same key</strong> — and the school knows <strong>exactly where to look</strong>.</li>
</ul>
<p>That’s how a <strong>HashMap</strong> works!</p>
<hr>
<h3 id="key-concepts-simple-terms">🔍 Key Concepts (Simple Terms)</h3>
<table>
<thead><tr>
<th>Term</th>
<th>Meaning (Easy Explanation)</th>
</tr></thead><tbody>
<tr>
<td><strong>Key</strong></td>
<td>A name or ID (like &quot;John&quot;, &quot;Math&quot;, etc.)</td>
</tr>
<tr>
<td><strong>Value</strong></td>
<td>The thing you want to store (like marks, info, etc.)</td>
</tr>
<tr>
<td><strong>Hash</strong></td>
<td>A number generated from the key</td>
</tr>
<tr>
<td><strong>Bucket</strong></td>
<td>A locker where the value is stored</td>
</tr>
<tr>
<td><strong>Collision</strong></td>
<td>When two keys point to the same locker</td>
</tr>
</tbody></table>
<hr>
<h3 id="flow-of-how-hashmap-works-step-by-step">🔄 Flow of How HashMap Works (Step-by-Step)</h3>
<h4 id="lets-say">Let&#x27;s say:</h4>
<pre><code class="language-java">
map.put(&quot;Apple&quot;, &quot;Red&quot;);
map.put(&quot;Banana&quot;, &quot;Yellow&quot;);
map.put(&quot;Grapes&quot;, &quot;Green&quot;);
</code></pre>
<hr>
<h3 id="step-1-key-is-hashed">Step 1: <strong>Key is Hashed</strong></h3>
<p>Java runs a <strong>hash function</strong> on the key to convert it into a number.</p>
<p>For example:</p>
<table>
<thead><tr>
<th>Key</th>
<th>Hash</th>
<th>Bucket Index (hash % size)</th>
</tr></thead><tbody>
<tr>
<td>Apple</td>
<td>1234</td>
<td>2</td>
</tr>
<tr>
<td>Banana</td>
<td>4567</td>
<td>7</td>
</tr>
<tr>
<td>Grapes</td>
<td>7890</td>
<td>0</td>
</tr>
</tbody></table>
<hr>
<h3 id="step-2-find-the-right-bucket">Step 2: <strong>Find the Right Bucket</strong></h3>
<p>HashMap has an internal array (like lockers):</p>
<pre><code class="language-">
Index:   0   1   2   3   4   5   6   7
        [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
</code></pre>
<p>Now it places the key-value pairs at the calculated index:</p>
<pre><code class="language-">
Index:   0   1   2            7
        [ ] [ ] [Apple=Red] [Banana=Yellow]
        [Grapes=Green]
</code></pre>
<hr>
<h3 id="step-3-handle-collisions-chaining">Step 3: <strong>Handle Collisions (Chaining)</strong></h3>
<p>If two keys point to the same index, Java <strong>links them in a list</strong> (like hanging keys on a hook):</p>
<pre><code class="language-">
Index:   0
        [Grapes=Green] -&gt; [AnotherKey=Value] -&gt; null
</code></pre>
<hr>
<h3 id="step-4-retrieving-a-value-get-method">Step 4: <strong>Retrieving a Value (get method)</strong></h3>
<pre><code class="language-java">
map.get(&quot;Banana&quot;);
</code></pre>
<ul>
<li>Java calculates the <strong>hash</strong> of &quot;Banana&quot;</li>
<li>Finds <strong>index 7</strong></li>
<li>Checks the bucket at index 7</li>
<li>Finds <code>&quot;Banana=Yellow&quot;</code> and returns <code>&quot;Yellow&quot;</code></li>
</ul>
<hr>
<h4 id="ascii-diagram-internal-working-of-hashmap">🧱 ASCII Diagram: Internal Working of HashMap</h4>
<pre><code class="language-">
                    ┌───────────────┐
        &quot;Apple&quot; --&gt; │ Hash Function │ --&gt; 1234 --&gt; Index 2
                    └───────────────┘
                            ↓
                   ┌───────────────────┐
 HashMap Array --&gt; │ ... │ [2] │ [7] │ ...
                   └───────────────────┘
                             ↓
                        ┌────────────┐
                        │ Apple=Red  │
                        └────────────┘

Now another key:

   &quot;Banana&quot; --&gt; Hash --&gt; 4567 --&gt; Index 7
                             ↓
                        ┌──────────────┐
                        │ Banana=Yellow│
                        └──────────────┘
</code></pre>
<h3 id="if-theres-a-collision">🔁 If there&#x27;s a collision:</h3>
<pre><code class="language-">
Two keys go to the same index (e.g., 7):

Index 7:
┌────────────────────────────────────┐
│ Banana=Yellow → Mango=Orange → null│
└────────────────────────────────────┘
</code></pre>
<hr>
<h3 id="internally-technical-but-simple">⚙️ Internally (Technical, but simple)</h3>
<ul>
<li>Uses an <strong>array of buckets</strong></li>
<li>Each bucket is a <strong>linked list</strong> or <strong>tree</strong> (if too many items)</li>
<li>Hash function: <code>hashCode()</code> → processes it → gets index</li>
<li>Resizes when too full (e.g., 75% of capacity)</li>
</ul>
<hr>
<h3 id="summary-even-simpler">📌 Summary (Even Simpler)</h3>
<table>
<thead><tr>
<th>What You Do</th>
<th>What HashMap Does Internally</th>
</tr></thead><tbody>
<tr>
<td><code>put(key, value)</code></td>
<td>Calculates where to store</td>
</tr>
<tr>
<td><code>get(key)</code></td>
<td>Calculates where to find</td>
</tr>
<tr>
<td>Keys collide</td>
<td>Links multiple values in same bucket</td>
</tr>
<tr>
<td>Too many entries</td>
<td>HashMap grows automatically</td>
</tr>
</tbody></table>
<hr>
<p>Great question! Let’s now dive into <strong>ConcurrentHashMap</strong> — what it is, <strong>how it&#x27;s different from HashMap</strong>, and <strong>how it works internally</strong>, especially in <strong>multi-threaded environments</strong>.</p>
<hr>
<h2 id="what-is-concurrenthashmap">🧠 What Is ConcurrentHashMap?</h2>
<p><code>ConcurrentHashMap</code> is a <strong>thread-safe</strong> version of <code>HashMap</code> in Java.</p>
<h3 id="why-use-it">✅ Why Use It?</h3>
<p>Because <strong>regular <code>HashMap</code> is not thread-safe</strong>. In a multithreaded program:</p>
<ul>
<li>Two threads inserting data at the same time → can corrupt the internal structure of <code>HashMap</code>.</li>
<li>This could lead to <strong>infinite loops</strong>, data loss, or unpredictable results.</li>
</ul>
<p><code>ConcurrentHashMap</code> allows:</p>
<ul>
<li><strong>Multiple threads</strong> to <strong>read and write</strong> safely</li>
<li>Without needing to <strong>synchronize the whole map</strong></li>
</ul>
<hr>
<h3 id="how-it-differs-from-hashmap">🔍 How It Differs from HashMap</h3>
<table>
<thead><tr>
<th>Feature</th>
<th>HashMap</th>
<th>ConcurrentHashMap</th>
</tr></thead><tbody>
<tr>
<td>Thread-safe?</td>
<td>❌ No</td>
<td>✅ Yes</td>
</tr>
<tr>
<td>Allows null keys/values</td>
<td>✅ Yes</td>
<td>❌ No (throws NPE)</td>
</tr>
<tr>
<td>Synchronization</td>
<td>❌ None</td>
<td>✅ Fine-grained (segments / nodes)</td>
</tr>
<tr>
<td>Performance (multi-threaded)</td>
<td>⚠️ Poor</td>
<td>🚀 Optimized</td>
</tr>
<tr>
<td>Internal Structure</td>
<td>Buckets + Linked List / Tree</td>
<td>Similar, but with <strong>thread-safe access</strong></td>
</tr>
</tbody></table>
<hr>
<h3 id="internal-working-java-8-and-above">⚙️ Internal Working (Java 8 and above)</h3>
<p>In <strong>Java 8</strong>, <code>ConcurrentHashMap</code> uses a <strong>lock-free, non-blocking approach</strong> for most operations, with <strong>segment-like behavior</strong> for write safety.</p>
<h4 id="core-concepts">🔩 Core Concepts:</h4>
<ul>
<li><strong>Bucket Array (like HashMap)</strong>: Holds data</li>
<li><strong>Synchronized only parts</strong> of the array (not the whole map)</li>
<li>Uses:</li>
</ul>
<ul>
<li><code>synchronized</code> blocks only when needed (not whole map)</li>
<li><strong>CAS (Compare-And-Swap)</strong> operations for atomic updates</li>
<li><strong>Concurrent reads</strong> without locking</li>
<li><strong>Lock striping</strong>: Only one bucket is locked, not the whole map</li>
</ul>
<hr>
<h3 id="insertion-flow-put-operation">🔄 Insertion Flow (Put Operation)</h3>
<p>Let’s break it down step-by-step:</p>
<pre><code class="language-">
Thread 1 → map.put(&quot;A&quot;, 100);
Thread 2 → map.put(&quot;B&quot;, 200);
</code></pre>
<ul>
<li>Each thread computes hash of key (&quot;A&quot;, &quot;B&quot;)</li>
<li>Finds the <strong>bucket (index)</strong></li>
<li><strong>If no collision</strong>:</li>
</ul>
<ul>
<li>Uses <strong>CAS (lock-free)</strong> to insert the node</li>
<li><strong>If collision</strong> (another entry at same index):</li>
</ul>
<ul>
<li>Synchronizes <strong>only that bucket&#x27;s node</strong></li>
<li>Traverses or treeifies if needed</li>
<li>No global lock!</li>
</ul>
<hr>
<h4 id="ascii-diagram-of-concurrenthashmap-simplified">🧱 ASCII Diagram of ConcurrentHashMap (Simplified)</h4>
<pre><code class="language-">
+-------------------------------+
|        ConcurrentHashMap      |
+-------------------------------+
|  [0]  [1]  [2]  [3]  [4] ...  |
|  |     |     |     |          |
|  v     v     v     v          |
|Node  Node  null  Node         |
| A=100 B=200      C=300        |
| (locked by T1) (locked by T2) |
+-------------------------------+

Multiple threads:
- T1 inserts &quot;A&quot; in bucket 0 → locks bucket 0
- T2 inserts &quot;B&quot; in bucket 1 → locks bucket 1
→ No interference!
</code></pre>
<hr>
<h3 id="read-operation-get">🧪 Read Operation (Get)</h3>
<ul>
<li><strong>Fully non-blocking</strong></li>
<li>Multiple threads can <strong>read without locks</strong></li>
<li>Achieved using <strong>volatile</strong> and safe memory visibility guarantees</li>
</ul>
<hr>
<h3 id="treeification-resizing">🔐 Treeification &amp; Resizing</h3>
<ul>
<li>Just like <code>HashMap</code>, if too many collisions in a bucket, it <strong>treeifies</strong> to Red-Black Tree.</li>
<li>Resizing is done using <strong>thread-safe cooperative techniques</strong>:</li>
</ul>
<ul>
<li>Multiple threads help resize</li>
<li>Old buckets are gradually copied to new array</li>
</ul>
<hr>
<h3 id="what-it-doesnt-do">🚨 What It Doesn’t Do</h3>
<ul>
<li>Doesn’t support <code>null</code> <strong>keys or values</strong>:</li>
</ul>
<pre><code class="language-java">
map.put(null, &quot;test&quot;); // Throws NullPointerException
</code></pre>
<ul>
<li>Doesn’t allow locking the entire map directly (use <code>Collections.synchronizedMap()</code> if you need coarse locking).</li>
</ul>
<hr>
<h3 id="when-to-use-concurrenthashmap">✅ When to Use ConcurrentHashMap</h3>
<table>
<thead><tr>
<th>Use Case</th>
<th>Recommendation</th>
</tr></thead><tbody>
<tr>
<td>Multi-threaded caching</td>
<td>✅ Yes</td>
</tr>
<tr>
<td>Shared state in web server</td>
<td>✅ Yes</td>
</tr>
<tr>
<td>Replace <code>synchronizedMap()</code></td>
<td>✅ Better</td>
</tr>
<tr>
<td>Single-threaded or read-heavy access</td>
<td>❌ Overkill</td>
</tr>
</tbody></table>
<hr>
<h3 id="summary">📌 Summary</h3>
<table>
<thead><tr>
<th>Feature</th>
<th>Details</th>
</tr></thead><tbody>
<tr>
<td>Thread-safe?</td>
<td>✅ Yes (fine-grained locking)</td>
</tr>
<tr>
<td>Read operations</td>
<td>Lock-free</td>
</tr>
<tr>
<td>Write operations</td>
<td>Per-bucket locking + CAS</td>
</tr>
<tr>
<td>Structure</td>
<td>Buckets + linked list / tree</td>
</tr>
<tr>
<td>Null keys/values</td>
<td>❌ Not allowed</td>
</tr>
<tr>
<td>Performance</td>
<td>🚀 Highly optimized</td>
</tr>
</tbody></table>
<hr>
<details>
<summary>🔁 <strong>Collections.synchronizedMap() vs ConcurrentHashMap</strong></summary>
<h3 id="1-collectionssynchronizedmapmapk-v">1. Collections.synchronizedMap(Map\&lt;K, V&gt;)</h3>
<ul>
<li>Wraps a regular map with synchronized methods.</li>
<li>Synchronizes on the entire map for every operation.</li>
<li>Slower under high concurrency due to full-map lock.</li>
<li>Manual synchronization needed during iteration.</li>
</ul>
<pre><code class="language-java">
Map&lt;String, String&gt; map = Collections.synchronizedMap(new HashMap&lt;&gt;());
synchronized (map) {
    for (Map.Entry&lt;String, String&gt; entry : map.entrySet()) {
        System.out.println(entry.getKey() + &quot; -&gt; &quot; + entry.getValue());
    }
}
</code></pre>
<hr>
<h3 id="2-concurrenthashmapk-v">2. <a href="https://javahungry.blogspot.com/2015/02/how-concurrenthashmap-works-in-java-internal-implementation.html">ConcurrentHashMap\&lt;K, V&gt;</a></h3>
<ul>
<li>Fine-grained locking or lock-free (Java 8+).</li>
<li>Allows concurrent access without blocking readers.</li>
<li>Weakly consistent iterator (no ConcurrentModificationException).</li>
<li>Best for high-concurrency scenarios.</li>
</ul>
<pre><code class="language-java">
Map&lt;String, String&gt; map = new ConcurrentHashMap&lt;&gt;();
map.put(&quot;A&quot;, &quot;Apple&quot;);
map.put(&quot;B&quot;, &quot;Banana&quot;);

for (Map.Entry&lt;String, String&gt; entry : map.entrySet()) {
    System.out.println(entry.getKey() + &quot; -&gt; &quot; + entry.getValue());
}
</code></pre>
<hr>
<h4 id="key-differences">⚖️ Key Differences</h4>
<table>
<thead><tr>
<th>Feature</th>
<th><code>Collections.synchronizedMap()</code></th>
<th><code>ConcurrentHashMap</code></th>
</tr></thead><tbody>
<tr>
<td>Locking Mechanism</td>
<td>Entire map</td>
<td>Fine-grained locking</td>
</tr>
<tr>
<td>Concurrency</td>
<td>Low</td>
<td>High</td>
</tr>
<tr>
<td>Read Operations</td>
<td>Blocking</td>
<td>Lock-free (Java 8+)</td>
</tr>
<tr>
<td>Write Operations</td>
<td>Full lock</td>
<td>Partial locking</td>
</tr>
<tr>
<td>Iteration Safety</td>
<td>Must synchronize manually</td>
<td>Weakly consistent</td>
</tr>
<tr>
<td>Null Keys/Values</td>
<td>✅ Yes</td>
<td>❌ No (NPE thrown)</td>
</tr>
<tr>
<td>Performance</td>
<td>Lower under contention</td>
<td>High scalability</td>
</tr>
</tbody></table>
<hr>
<h3 id="when-to-use-what">🧭 When to Use What?</h3>
<ul>
<li>✅ Use <code>Collections.synchronizedMap()</code> when:</li>
</ul>
<ul>
<li>Few concurrent threads</li>
<li>You need <code>null</code> keys/values</li>
<li>Simplicity is more important than performance</li>
</ul>
<ul>
<li>✅ Use <code>ConcurrentHashMap</code> when:</li>
</ul>
<ul>
<li>High concurrency &amp; performance is required</li>
<li>Safe iteration without locking is needed</li>
<li><code>null</code> keys/values are not needed</li>
</ul>
<hr>
<h3 id="why-concurrenthashmap-disallows-nulls">❗ Why ConcurrentHashMap Disallows Nulls?</h3>
<ul>
<li>Prevents ambiguity in <code>map.get(key)</code>:</li>
</ul>
<ul>
<li><code>null</code> might mean missing key or <code>null</code> value.</li>
<li>Avoids needing extra synchronization for <code>null</code> checks.</li>
<li>Ensures safe concurrent computation.</li>
</ul>
</details>
<details>
<summary><strong>🧵 Synchronized & Concurrent Collections</strong></summary>
<ul>
<li>Legacy synchronized: <code>Vector</code>, <code>Hashtable</code></li>
<li>Wrapper methods:</li>
</ul>
<ul>
<li><code>Collections.synchronizedList(list)</code></li>
<li>Modern concurrent collections:</li>
</ul>
<ul>
<li><code>ConcurrentHashMap</code></li>
<li><code>CopyOnWriteArrayList</code></li>
<li><code>BlockingQueue</code></li>
<li><code>ConcurrentLinkedQueue</code></li>
</ul>
</details>
<hr>
<h2 id="summary-when-to-use-what">🛡️ Summary: When to Use What?</h2>
<table>
<thead><tr>
<th>Need</th>
<th>Use</th>
</tr></thead><tbody>
<tr>
<td>Random access</td>
<td><code>ArrayList</code></td>
</tr>
<tr>
<td>Frequent insert/delete (ends)</td>
<td><code>LinkedList</code></td>
</tr>
<tr>
<td>Thread-safe list</td>
<td><code>CopyOnWriteArrayList</code></td>
</tr>
<tr>
<td>No duplicates</td>
<td><code>Set</code>, <code>HashSet</code></td>
</tr>
<tr>
<td>Sorted no duplicates</td>
<td><code>TreeSet</code></td>
</tr>
<tr>
<td>Ordered no duplicates</td>
<td><code>LinkedHashSet</code></td>
</tr>
<tr>
<td>FIFO</td>
<td><code>Queue</code>, <code>LinkedList</code>, <code>ArrayDeque</code></td>
</tr>
<tr>
<td>LIFO (stack)</td>
<td><code>ArrayDeque</code></td>
</tr>
<tr>
<td>Key-value, no order</td>
<td><code>HashMap</code></td>
</tr>
<tr>
<td>Key-value, insertion order</td>
<td><code>LinkedHashMap</code></td>
</tr>
<tr>
<td>Key-value, sorted keys</td>
<td><code>TreeMap</code></td>
</tr>
<tr>
<td>Thread-safe key-value</td>
<td><code>ConcurrentHashMap</code></td>
</tr>
</tbody></table>
<hr>
<h1 id="java-collections-framework-overview-java-10-java-21"><strong>Java Collections Framework Overview (Java 1.0 - Java 21)</strong></h1>
<details>
<summary>Java Collections Timeline & Features</summary>
<table>
<thead><tr>
<th><strong>Java Version</strong></th>
<th><strong>New Collections &amp; Features (null, Sync)</strong></th>
<th><strong>Description &amp; Key Features</strong></th>
</tr></thead><tbody>
<tr>
<td><strong>JDK 1.0</strong></td>
<td>- <code>Vector (many, Y)</code>&lt;br&gt;- <code>Stack (many, Y)</code>&lt;br&gt;- <code>Hashtable ((0, 0), Y)</code>&lt;br&gt;- <code>Properties ((0, many), Y)</code>&lt;br&gt;- <code>Enumeration</code></td>
<td>Initial synchronized collections. <code>Hashtable</code> and <code>Properties</code> store key-value pairs.</td>
</tr>
<tr>
<td><strong>JDK 1.2</strong></td>
<td>- <code>ArrayList (many, N)</code>&lt;br&gt;- <code>LinkedList (many, N)</code>&lt;br&gt;- <code>HashSet (N/A, N)</code>&lt;br&gt;- <code>TreeSet (N/A, N)</code>&lt;br&gt;- <code>HashMap ((1, many), N)</code>&lt;br&gt;- <code>TreeMap ((0, many), N)</code>&lt;br&gt;- <code>Iterator</code>&lt;br&gt;- <code>ListIterator</code></td>
<td>Core interfaces introduced (<code>Collection</code>, <code>Set</code>, <code>List</code>, <code>Map</code>). <code>TreeMap</code> disallows <code>null</code> keys.</td>
</tr>
<tr>
<td><strong>JDK 1.4</strong></td>
<td>- <code>LinkedHashSet (N/A, N)</code>&lt;br&gt;- <code>LinkedHashMap ((1, many), N)</code></td>
<td>Maintains insertion order. <code>LinkedHashMap</code> allows one <code>null</code> key.</td>
</tr>
<tr>
<td><strong>JDK 1.5</strong></td>
<td>- <code>Queue (varies, N)</code>&lt;br&gt;- <code>CopyOnWriteArrayList (many, Y)</code>&lt;br&gt;- <code>CopyOnWriteArraySet (N/A, Y)</code>&lt;br&gt;- Enhanced for-each loop</td>
<td><code>Queue</code> implementations vary in null handling (<code>PriorityQueue</code> disallows <code>null</code>). Thread-safe <code>CopyOnWriteArrayList</code>.</td>
</tr>
<tr>
<td><strong>JDK 1.6</strong></td>
<td>- <code>NavigableSet (N/A, N)</code>&lt;br&gt;- <code>NavigableMap ((0, many), N)</code>&lt;br&gt;- <code>Deque (varies, N)</code>&lt;br&gt;- <code>ArrayDeque (N/A, N)</code>&lt;br&gt;- <code>ConcurrentSkipListSet (N/A, Y)</code>&lt;br&gt;- <code>ConcurrentSkipListMap ((0, many), Y)</code></td>
<td>Sorted and double-ended queue structures added. <code>ConcurrentSkipListMap</code> disallows <code>null</code> keys.</td>
</tr>
<tr>
<td><strong>JDK 1.8</strong></td>
<td>- <code>stream()</code>&lt;br&gt;- <code>parallelStream()</code>&lt;br&gt;- <code>spliterator()</code>&lt;br&gt;- <code>removeIf()</code>&lt;br&gt;- <code>HashMap</code> performance improvements</td>
<td>Functional programming (Streams API, lambdas). <code>HashMap</code> optimized internally with red-black trees.</td>
</tr>
<tr>
<td><strong>JDK 9</strong></td>
<td>- <code>List.of() (0, N)</code>&lt;br&gt;- <code>Set.of() (0, N)</code>&lt;br&gt;- <code>Map.of() ((0, 0), N)</code>&lt;br&gt;- <code>Map.ofEntries() ((0, 0), N)</code></td>
<td>Factory methods for <strong>immutable</strong> collections. Nulls not allowed.</td>
</tr>
<tr>
<td><strong>JDK 10</strong></td>
<td>- <code>List.copyOf() (varies, N)</code>&lt;br&gt;- <code>Set.copyOf() (varies, N)</code>&lt;br&gt;- <code>Map.copyOf() ((varies, varies), N)</code></td>
<td>Unmodifiable copies creation methods. Null behavior depends on original collection.</td>
</tr>
<tr>
<td><strong>JDK 11</strong></td>
<td>- <code>Collection.toArray(IntFunction)</code></td>
<td>Converts collections to arrays of desired runtime type.</td>
</tr>
<tr>
<td><strong>JDK 21</strong></td>
<td>- <code>SequencedCollection (varies, N)</code>&lt;br&gt;- <code>SequencedSet (varies, N)</code>&lt;br&gt;- <code>SequencedMap ((varies, varies), N)</code></td>
<td>Interfaces for collections with <strong>defined order</strong> and reversed views.</td>
</tr>
</tbody></table>
</details>
<details>
<summary>Legend & Key Takeaways</summary>
<h3 id="legend">Legend:</h3>
<ul>
<li><strong>(null keys, null values)</strong> — For key-value collections (<code>Map</code>)</li>
<li><strong>(null values only)</strong> — For non-key-value collections (<code>List</code>, <code>Set</code>, <code>Queue</code>, etc.)</li>
<li><strong>Thread Safety:</strong></li>
<li><strong>Y</strong> — Synchronized</li>
<li><strong>N</strong> — Not synchronized</li>
</ul>
<hr>
<p><strong>✅ Key Takeaway</strong></p>
<ul>
<li><strong>Thread-Safe Collections:</strong>  </li>
</ul>
<p>  Legacy classes like <code>Vector</code> and <code>Hashtable</code> are synchronized but modern alternatives such as <code>ConcurrentHashMap</code> and <code>CopyOnWriteArrayList</code> provide better concurrency.</p>
<ul>
<li><strong>Null Handling:</strong>  </li>
<li><code>HashMap</code> allows one <code>null</code> key.  </li>
<li><code>TreeMap</code> and <code>ConcurrentSkipListMap</code> disallow <code>null</code> keys.  </li>
<li>Most lists and sets allow <code>null</code> values except immutable collections (<code>List.of()</code>, <code>Set.of()</code>) and <code>ConcurrentSkipListSet</code>.</li>
</ul>
<ul>
<li><strong>Performance &amp; Optimizations:</strong>  </li>
</ul>
<p>  Java 8+ optimized <code>HashMap</code> internals and introduced streams API for functional-style operations.</p>
<ul>
<li><strong>Immutable Collections (Java 9+):</strong>  </li>
</ul>
<p>  Factory methods create unmodifiable collections that do not accept <code>null</code> elements.</p>
<ul>
<li><strong>Ordered Collections (Java 21):</strong>  </li>
</ul>
<p>  New <code>SequencedCollection</code>, <code>SequencedSet</code>, and <code>SequencedMap</code> interfaces provide consistent iteration order with additional operations.</p>
</details>
<hr>
<details>
<summary>Applet Lifecycle Methods</summary>
<ul>
<li><code>public void init()</code>: Called once to initialize the applet.</li>
<li><code>public void start()</code>: Called after <code>init()</code> or when browser is maximized; starts the applet.</li>
<li><code>public void stop()</code>: Called when applet is stopped or browser minimized; stops the applet.</li>
<li><code>public void destroy()</code>: Called once to destroy the applet.</li>
</ul>
</details>
<hr>
<details>
<summary>Serialization & Deserialization</summary>
<ul>
<li>Serialization converts an object into a byte stream for storage or transmission.</li>
<li>Deserialization reconstructs the object from the byte stream.</li>
<li>Use <code>writeObject()</code> and <code>ObjectOutputStream</code> for serialization.</li>
<li>Use <code>readObject()</code> and <code>ObjectInputStream</code> for deserialization.</li>
<li>Only classes implementing <code>java.io.Serializable</code> can be serialized.</li>
</ul>
<hr>
<h3 id="1-what-is-serialization"><strong>1. What is Serialization?</strong></h3>
<ul>
<li><strong>Serialization</strong> is the process of converting an <strong>in-memory Java object</strong> into a <strong>byte stream</strong> (or some other transferable format like JSON, XML, etc.).</li>
<li>The reverse process is <strong>deserialization</strong> — converting the byte stream back into an object.</li>
</ul>
<hr>
<h3 id="2-why-do-we-need-to-serialize-if-an-object-is-already-in-memory-which-is-bytes-anyway"><strong>2. Why do we need to serialize if an object is already in memory (which is bytes anyway)?</strong></h3>
<p>Good question. Yes, technically objects in memory are stored as <strong>bytes</strong> in the JVM heap. But:</p>
<ul>
<li>That representation is <strong>JVM-specific</strong>, tied to memory layout, references, garbage collector, etc.</li>
<li>You <strong>cannot take those raw JVM bytes</strong> and write them to a file or send them over a network — another JVM (or another language) won’t know how to interpret them.</li>
<li>Serialization converts the object into a <strong>standardized format</strong> that can be:</li>
</ul>
<ul>
<li>Saved to disk</li>
<li>Sent over a network</li>
<li>Reconstructed later</li>
</ul>
<hr>
<h3 id="3-why-serialization-is-needed-use-cases"><strong>3. Why Serialization is Needed (Use Cases)</strong></h3>
<ul>
<li><strong>Persistence</strong></li>
</ul>
<ul>
<li>Save an object’s state to a file/database and restore it later.</li>
<li>Example: storing user sessions.</li>
</ul>
<ul>
<li><strong>Communication (Distributed Systems)</strong></li>
</ul>
<ul>
<li>Send objects over the network (e.g., between microservices).</li>
<li>Example: Spring Boot → JSON serialization for REST APIs.</li>
</ul>
<ul>
<li><strong>Caching</strong></li>
</ul>
<ul>
<li>Objects are serialized to store in Redis, Hazelcast, or another distributed cache.</li>
</ul>
<ul>
<li><strong>Deep Copying</strong></li>
</ul>
<ul>
<li>Serialize → Deserialize to create a true deep copy of an object.</li>
</ul>
<hr>
<h3 id="4-analogy"><strong>4. Analogy</strong></h3>
<p>Think of an object in memory like <strong>a house</strong>:</p>
<ul>
<li>Inside, things are structured in a very specific way (JVM internal representation).</li>
<li>If you want to <strong>move the house elsewhere</strong> (send object to another system), you can’t just “copy the ground and bricks” — that won’t make sense.</li>
<li>Instead, you <strong>serialize it into blueprints (bytes in standard format)</strong>, send/store them, and then <strong>rebuild the house (deserialize)</strong> elsewhere.</li>
</ul>
<hr>
<p>✅ <strong>Summary</strong>:</p>
<ul>
<li>Objects in memory are <em>already bytes</em>, but only meaningful to the <strong>current JVM</strong>.</li>
<li><strong>Serialization</strong> makes those objects <strong>portable and reconstructible</strong>, independent of the JVM’s internal representation.</li>
</ul>
<hr>
<p><strong>Transient Keywor</strong></p>
<ul>
<li>Fields marked <code>transient</code> are <strong>not serialized</strong>.</li>
</ul>
<p><strong>Marshaling (or marshalling)</strong> and related terms like <strong>unmarshaling</strong>, <strong>serialization</strong>, and <strong>deserialization</strong> often confuse beginners in Java, so let’s break them down clearly and simply.</p>
<hr>
<h2 id="marshalingunmarshaling">Marshaling/Unmarshaling</h2>
<h3 id="what-is-marshaling-in-java">🧩 What is <em>Marshaling</em> in Java?</h3>
<p><strong>Marshaling</strong> means <strong>converting an object in memory into a format that can be transmitted or stored</strong> — for example, converting a Java object into a byte stream, JSON, or XML so that it can be:</p>
<ul>
<li>Sent over a network (e.g. in a web service call)</li>
<li>Saved to a file or database</li>
<li>Shared between two different programs or systems</li>
</ul>
<p>✅ <strong>Example (Conceptually):</strong></p>
<pre><code class="language-java">
Employee emp = new Employee(&quot;John&quot;, 30);
byte[] data = convertToBytes(emp);  // marshaling
</code></pre>
<p>Here, we &quot;marshal&quot; the <code>Employee</code> object into a transferable form (like bytes).</p>
<hr>
<h3 id="what-is-unmarshaling">🔄 What is <em>Unmarshaling</em>?</h3>
<p><strong>Unmarshaling</strong> is the <strong>reverse process</strong> — converting the transmitted or stored data <em>back</em> into a Java object.</p>
<p>✅ Example:</p>
<pre><code class="language-java">
Employee emp = convertFromBytes(data);  // unmarshaling
</code></pre>
<p>So, after receiving the data (like from a network), we rebuild the original object.</p>
<hr>
<h3 id="related-terms">🧠 Related Terms</h3>
<table>
<thead><tr>
<th>Term</th>
<th>Meaning</th>
<th>Typical Use</th>
</tr></thead><tbody>
<tr>
<td><strong>Serialization</strong></td>
<td>Converting an object to a byte stream (for storage or transfer)</td>
<td><code>ObjectOutputStream</code></td>
</tr>
<tr>
<td><strong>Deserialization</strong></td>
<td>Rebuilding the object from a byte stream</td>
<td><code>ObjectInputStream</code></td>
</tr>
<tr>
<td><strong>Marshalling</strong></td>
<td>More general — converting object to any transferable format (XML, JSON, etc.)</td>
<td>Used in web services (e.g., JAXB, RMI)</td>
</tr>
<tr>
<td><strong>Unmarshalling</strong></td>
<td>Converting data (XML/JSON/etc.) back into an object</td>
<td>Used when reading API responses, SOAP, etc.</td>
</tr>
</tbody></table>
<hr>
<h2 id="examples-of-marshalling-in-java">🧰 Examples of Marshalling in Java</h2>
<h3 id="1-java-serialization">1️⃣ Java Serialization</h3>
<pre><code class="language-java">
import java.io.*;

class Employee implements Serializable {
    String name;
    int age;
    
    Employee(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Employee emp = new Employee(&quot;John&quot;, 25);

        // Marshalling (Serialization)
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(&quot;emp.ser&quot;));
        oos.writeObject(emp);
        oos.close();

        // Unmarshalling (Deserialization)
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(&quot;emp.ser&quot;));
        Employee emp2 = (Employee) ois.readObject();
        ois.close();

        System.out.println(emp2.name + &quot; - &quot; + emp2.age);
    }
}
</code></pre>
<hr>
<h3 id="2-jaxb-example-xml-marshalling">2️⃣ JAXB Example (XML Marshalling)</h3>
<p>If you’re working with <strong>XML</strong>, <code>JAXB</code> (Java Architecture for XML Binding) can marshal/unmarshal Java objects.</p>
<pre><code class="language-java">
import javax.xml.bind.annotation.*;
import javax.xml.bind.*;

@XmlRootElement
class Employee {
    public String name;
    public int age;
}

public class Main {
    public static void main(String[] args) throws Exception {
        Employee emp = new Employee();
        emp.name = &quot;John&quot;;
        emp.age = 25;

        // Marshalling: Java -&gt; XML
        JAXBContext context = JAXBContext.newInstance(Employee.class);
        Marshaller marshaller = context.createMarshaller();
        marshaller.marshal(emp, System.out);

        // Unmarshalling: XML -&gt; Java
        String xml = &quot;&lt;employee&gt;&lt;name&gt;Jane&lt;/name&gt;&lt;age&gt;30&lt;/age&gt;&lt;/employee&gt;&quot;;
        Unmarshaller unmarshaller = context.createUnmarshaller();
        Employee emp2 = (Employee) unmarshaller.unmarshal(new java.io.StringReader(xml));
        System.out.println(emp2.name + &quot; - &quot; + emp2.age);
    }
}
</code></pre>
<hr>
<h2 id="summary">💡 Summary</h2>
<table>
<thead><tr>
<th>Process</th>
<th>Direction</th>
<th>Example</th>
</tr></thead><tbody>
<tr>
<td><strong>Marshalling</strong></td>
<td>Object → Transfer format</td>
<td>Java object → XML/JSON/Bytes</td>
</tr>
<tr>
<td><strong>Unmarshalling</strong></td>
<td>Transfer format → Object</td>
<td>XML/JSON/Bytes → Java object</td>
</tr>
<tr>
<td><strong>Serialization</strong></td>
<td>Object → Byte stream</td>
<td>Java’s native serialization</td>
</tr>
<tr>
<td><strong>Deserialization</strong></td>
<td>Byte stream → Object</td>
<td>Reading back serialized object</td>
</tr>
</tbody></table>
</details>
<hr>
<details>
<summary>Autoboxing and Auto-Unboxing</summary>
<h3 id="boxing-autoboxing-primitive-wrapper-object">Boxing &amp; Autoboxing (Primitive → Wrapper Object)</h3>
<pre><code class="language-java">
Integer boxedValue = Integer.valueOf(10);  // Boxing
Integer autoBoxedValue = 10;                // Autoboxing
</code></pre>
<h3 id="unboxing-auto-unboxing-wrapper-object-primitive">Unboxing &amp; Auto-unboxing (Wrapper Object → Primitive)</h3>
<pre><code class="language-java">
int unboxedValue = boxedValue.intValue();  // Unboxing
int autoUnboxedValue = boxedValue;         // Auto-unboxing
</code></pre>
</details>
<hr>
<details>
<summary>Initialization vs Instantiation</summary>
<ul>
<li><strong>Initialization:</strong> Assigning initial values to variables.</li>
<li><strong>Instantiation:</strong> Creating new objects from classes to access properties and methods.</li>
</ul>
</details>
<hr>
<details>
<summary>Float vs Double</summary>
<table>
<thead><tr>
<th>Type</th>
<th>Size (bytes)</th>
<th>Precision (digits)</th>
<th>Notes</th>
</tr></thead><tbody>
<tr>
<td>float</td>
<td>4</td>
<td>6-7</td>
<td>Approximate, less precise</td>
</tr>
<tr>
<td>double</td>
<td>8</td>
<td>15-16</td>
<td>More precise than float</td>
</tr>
</tbody></table>
</details>
<hr>
<details>
<summary>int vs Integer</summary>
<ul>
<li><code>int</code> is a primitive data type.</li>
<li><code>Integer</code> is an object wrapper class.</li>
</ul>
<p>See <a href="https://stackoverflow.com/questions/8660691/what-is-the-difference-between-integer-and-int-in-java">StackOverflow: int vs Integer</a>.</p>
</details>
<hr>
<details>
<summary>size() vs length</summary>
<table>
<thead><tr>
<th>Usage</th>
<th>Applies To</th>
<th>Returns</th>
<th>Example</th>
</tr></thead><tbody>
<tr>
<td><code>size()</code> method</td>
<td>Collections</td>
<td>Number of elements in a collection</td>
<td><code>list.size()</code></td>
</tr>
<tr>
<td><code>length</code> property</td>
<td>Arrays</td>
<td>Number of elements in an array</td>
<td><code>array.length</code></td>
</tr>
<tr>
<td><code>length()</code> method</td>
<td>Strings</td>
<td>Number of characters in a string</td>
<td><code>&quot;hello&quot;.length()</code></td>
</tr>
</tbody></table>
<h3 id="why">Why?</h3>
<ul>
<li>Arrays: <code>.length</code> is a <strong>property</strong> (field), accessed without parentheses.</li>
<li>Strings: <code>.length()</code> is a <strong>method</strong>, called with parentheses.</li>
</ul>
</details>
<hr>
<details>
<summary>Final, Finally, and Finalize</summary>
<h3 id="final-keyword"><code>final</code> keyword</h3>
<p><img src="../images/JavaBasic/FinalKeyWord.png" alt="FinalKeyWord"></p>
<ul>
<li>Used to declare constants, prevent method overriding or inheritance.</li>
</ul>
<h3 id="finally-block"><code>finally</code> block</h3>
<ul>
<li>Used after try-catch blocks for cleanup code that always executes.</li>
<li>Can be skipped if <code>System.exit()</code> is called before it.</li>
</ul>
<h3 id="finalize-method"><code>finalize()</code> method</h3>
<ul>
<li>Called by Garbage Collector before object destruction (deprecated and discouraged).</li>
</ul>
</details>
<hr>
<details>
<summary>Garbage Collection in Java</summary>
<ul>
<li>Automatically frees memory occupied by unreachable objects.</li>
<li>Operates on the Java Heap.</li>
<li>Several algorithms exist: Serial, Parallel, CMS, G1.</li>
<li><code>finalize()</code> is unreliable for cleanup; prefer <code>AutoCloseable</code>.</li>
<li>Use profiling tools for monitoring.</li>
<li>Nullify references and clear collections to aid GC.</li>
</ul>
<h3 id="example">Example:</h3>
<pre><code class="language-java">
MyClass obj = new MyClass();
// use obj
obj = null; // eligible for GC
</code></pre>
</details>
<hr>
<details>
<summary>Manually Invoking Garbage Collection</summary>
<ul>
<li>Use <code>System.gc()</code> or <code>Runtime.getRuntime().gc()</code> to <em>suggest</em> GC run.</li>
</ul>
<pre><code class="language-java">
System.gc();
Runtime.getRuntime().gc();
</code></pre>
<ul>
<li>JVM may ignore these calls.</li>
<li>Manual GC calls are discouraged; trust JVM automatic GC.</li>
</ul>
</details>
<hr>
<h1 id="𝐂𝐚𝐜𝐡𝐢𝐧𝐠-𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐢𝐞𝐬-𝐁𝐞𝐬𝐭-𝐏𝐫𝐚𝐜𝐭𝐢𝐜𝐞𝐬">⚙️ 𝐂𝐚𝐜𝐡𝐢𝐧𝐠 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐢𝐞𝐬 &amp; 𝐁𝐞𝐬𝐭 𝐏𝐫𝐚𝐜𝐭𝐢𝐜𝐞𝐬</h1>
<ul>
<li>Caching is a technique wherein objects in your application are stored in a temporary storage area known as cache.</li>
</ul>
<p><img src="../images/SpringBoot/CacheFlow.png" alt="CacheFlow.png"></p>
<h2 id="caching-in-java">Caching in java</h2>
<p><img src="../images/JavaBasic/CachingJava.jpg" alt="CachingJava"></p>
<hr>
<details>
<summary><strong>📌 Suitable Scenarios</strong></summary>
<ul>
<li>🧠 <strong>In-memory solution</strong> — ideal when data must be fetched extremely fast.</li>
<li>📚 <strong>Read-heavy systems</strong> — caching helps offload database reads.</li>
<li>🔄 <strong>Data not frequently updated</strong> — best suited for stable datasets or reference data.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>🧩 Caching Techniques</strong></summary>
<ul>
<li><strong>Cache Aside:</strong> Application reads from cache first, then falls back to the database if missing, and updates the cache.</li>
<li><strong>Write-Through:</strong> Data is written to the cache and the database simultaneously.</li>
<li><strong>Read-Through:</strong> Application requests data from the cache; if missing, the cache fetches from the database.</li>
<li><strong>Write-Around:</strong> Writes go directly to the database, bypassing the cache; cache is updated only on reads.</li>
<li><strong>Write-Back:</strong> Data is first written to the cache and asynchronously persisted to the database later.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>🧮 Cache Eviction Algorithms</strong></summary>
<ul>
<li><strong>LRU (Least Recently Used):</strong> Removes items that haven’t been accessed recently.</li>
<li><strong>LFU (Least Frequently Used):</strong> Removes items accessed least often.</li>
<li><strong>FIFO (First-In, First-Out):</strong> Evicts the oldest entries first.</li>
<li><strong>RR (Random Replacement):</strong> Randomly evicts items when space is needed.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>📊 Key Metrics</strong></summary>
<ul>
<li><strong>Cache Hit Ratio:</strong> Percentage of requests served from cache.</li>
<li><strong>Latency:</strong> Time taken to retrieve data.</li>
<li><strong>Throughput:</strong> Number of requests processed per second.</li>
<li><strong>Invalidation Rate:</strong> Frequency of cache entries being invalidated or refreshed.</li>
<li><strong>Memory Usage:</strong> Total memory consumed by cache.</li>
<li><strong>CPU Usage:</strong> Processor overhead for cache operations.</li>
<li><strong>Network Usage:</strong> Bandwidth impact due to cache synchronization or invalidations.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>⚠️ Other Issues</strong></summary>
<ul>
<li><strong>Thunder Herd on Cold Start:</strong> Surge of concurrent requests when the cache is empty.</li>
<li><strong>TTL (Time-To-Live):</strong> Controls how long data remains valid in cache before expiration.</li>
</ul>
</details>
<hr>
<h1 id="two-types-of-error">Two types of error:-</h1>
<details>
<summary>🛑 1. Syntax Error or Compile Time Error</summary>
<ul>
<li>A syntax error occurs when the structure of your code violates the rules of the programming language.</li>
<li>It&#x27;s related to the grammar or syntax of the language, and these errors are detected by the compiler or interpreter during the compilation or interpretation process.</li>
<li>Syntax errors prevent the program from being executed successfully.</li>
</ul>
</details>
<hr>
<details>
<summary>⚠️ 2. Semantic Error or Run Time Error</summary>
<ul>
<li>A semantic error is a logical error in the program that does not violate the syntax of the programming language but leads to incorrect behavior.</li>
</ul>
</details>
<hr>
<h2 id="exception-handling">Exception Handling</h2>
<details>
<summary>📌 Overview of Exception Hierarchy</summary>
<ul>
<li>In Java, an exception is an event that disrupts the normal flow of the program. It is an object which is thrown at runtime.</li>
</ul>
<pre><code class="language-">

Throwable
|
|__ Exception
    |
    |__ (IOException, SQLException, ClassNotFoundException, RuntimeException) Checked Exceptions
        |
        |__ (ArithmeticException, NullPointerException, NumberFormatException, IndexOutOfBoundException
            |
            |__ ArrayOutOfBoundException, StringIndexOutOfBoundException)Unchecked Exceptions

&gt; Detailed tree structure

java.lang.Throwable (class)
│
├── java.lang.Error (class)
│   ├── AssertionError (class)
│   ├── OutOfMemoryError (class)
│   ├── StackOverflowError (class)
│   ├── VirtualMachineError (class)
│   │   ├── InternalError (class)
│   │   └── OutOfMemoryError (class)
│   └── LinkageError (class)
│       ├── ClassNotFoundError (class)
│       └── NoClassDefFoundError (class)
│
└── java.lang.Exception(Checked exceptions) (class)
├── IOException (class)
│   ├── FileNotFoundException (class)
│   ├── EOFException (class)
│   ├── SocketException (class)
│   ├── IOException
│   └── SQLException (class)
├── RuntimeException(Unchecked exception) (class)
│   ├── NullPointerException (class)
│   ├── ArithmeticException (class)
│   ├── ArrayIndexOutOfBoundsException (class)
│   ├── ClassCastException (class)
│   ├── IllegalArgumentException (class)
│   ├── IllegalStateException (class)
│   └── UnsupportedOperationException (class)
├── SQLException (class)
├── ParseException (class)
└── InterruptedException (class)

</code></pre>
<div class="mermaid">

mindmap
  root((Throwable))

    Error
      AssertionError
      OutOfMemoryError
      StackOverflowError
      VirtualMachineError
        InternalError
        OutOfMemoryError
      LinkageError
        ClassNotFoundError
        NoClassDefFoundError

    Exception (Checked)
      IOException
        FileNotFoundException
        EOFException
        SocketException
      SQLException
      ParseException
      InterruptedException

      RuntimeException (Unchecked)
        NullPointerException
        ArithmeticException
        ArrayIndexOutOfBoundsException
        ClassCastException
        IllegalArgumentException
        IllegalStateException
        UnsupportedOperationException

</div>
</details>
<hr>
<h2 id="throw-new-and-throws">throw new and throws</h2>
<details>
<summary>🎯 throw vs throws</summary>
<h3 id="throw"><code>throw</code></h3>
<ul>
<li>Used to <strong>explicitly throw</strong> an exception from code.</li>
<li>Followed by an exception instance (usually <code>new</code>).</li>
</ul>
<pre><code class="language-java">
throw new CustomException(&quot;This is a custom exception message&quot;);
</code></pre>
<hr>
<h3 id="throws"><code>throws</code></h3>
<ul>
<li>Used in <strong>method signature</strong> to declare that the method may throw exceptions.</li>
</ul>
<pre><code class="language-java">
public void myMethod() throws IOException {
    // may throw IOException
}
</code></pre>
<blockquote>🔁 <code>throw</code> is <strong>used inside</strong> the method body to raise exception,</blockquote>
<blockquote><code>throws</code> is <strong>declared on</strong> the method signature.</blockquote>
</details>
<hr>
<h2 id="checked-and-unchecked-exceptions"><a href="https://www.javamadesoeasy.com/2015/05/exception-handling-exception-hierarchy.html">Checked and Unchecked Exceptions</a></h2>
<details>
<summary>✅ Checked vs Unchecked Exceptions</summary>
<p><img src="../images/JavaBasic/Checked_UnChecked.png" alt="Checked vs Unchecked"></p>
<h3 id="1-checked-exceptions">1. <strong>Checked Exceptions</strong></h3>
<ul>
<li>Must be handled with try-catch or declared with <code>throws</code>.</li>
<li>Examples: <code>IOException</code>, <code>SQLException</code>, <code>ClassNotFoundException</code>.</li>
</ul>
<pre><code class="language-java">
try {
    // risky operation
} catch (IOException | SQLException e) {
    // handle checked exceptions
}
</code></pre>
<p>or</p>
<pre><code class="language-java">
public void method() throws IOException {
    // may throw IOException
}
</code></pre>
<hr>
<h3 id="2-unchecked-exceptions">2. <strong>Unchecked Exceptions</strong></h3>
<ul>
<li>Subclass of <code>RuntimeException</code>.</li>
<li>Not mandatory to handle, but can be caught.</li>
</ul>
<p>Examples: <code>NullPointerException</code>, <code>ArithmeticException</code>, <code>IndexOutOfBoundsException</code>.</p>
<pre><code class="language-java">
try {
    String value = null;
    value.length(); // throws NPE
} catch (NullPointerException e) {
    System.out.println(&quot;Handled NPE&quot;);
}
</code></pre>
<p>✅ <strong>Best practice</strong>: Prevent them through defensive programming rather than relying on exception handling.</p>
</details>
<hr>
<details>
<summary>🛠 Best Practices for Exception Handling</summary>
<ul>
<li>Use <strong>specific</strong> exception types (avoid <code>Exception e</code> unless necessary).</li>
<li>Avoid empty <code>catch</code> blocks.</li>
<li>Log exceptions with stack trace for debugging.</li>
<li>Never use exceptions for flow control.</li>
<li>Use <code>finally</code> or <code>try-with-resources</code> for cleanup.</li>
<li>Use <strong>custom exceptions</strong> for domain-specific cases.</li>
<li>Consider <strong>rethrowing</strong> after logging if needed.</li>
</ul>
</details>
<hr>
<details>
<summary>🧪 Exiting finally block early</summary>
<ul>
<li>Normally, the <code>finally</code> block always executes.</li>
<li>It can be <strong>skipped</strong> using <code>System.exit()</code>:</li>
</ul>
<pre><code class="language-java">
try {
    System.exit(0); // skips finally
} finally {
    System.out.println(&quot;This will not print&quot;);
}
</code></pre>
</details>
<hr>
<h2 id="try-with-resource-java-7-and-java-9-improvements">Try with Resource <a href="https://www.tutorialspoint.com/java9/java9<em>try</em>with<em>resources</em>improvement.htm">(Java 7 and Java 9 Improvements)</a></h2>
<details>
<summary>🧱 Traditional try-catch-finally Block</summary>
<pre><code class="language-java">
Scanner scanner = null;
try {
  scanner = new Scanner(new File(&quot;test.txt&quot;));
  while (scanner.hasNext()) {
    System.out.println(scanner.nextLine());
  }
} catch (FileNotFoundException e) {
  e.printStackTrace();
} finally {
  if (scanner != null) {
    scanner.close();
  }
}
</code></pre>
</details>
<hr>
<details>
<summary>✨ try-with-resources (Java 7+)</summary>
<ul>
<li>Automatically closes resources that implement <code>AutoCloseable</code> or <code>Closeable</code>.</li>
<li>Eliminates the need for a <code>finally</code> block to close resources.</li>
</ul>
<pre><code class="language-java">
try (Scanner scanner = new Scanner(new File(&quot;test.txt&quot;))) {
  while (scanner.hasNext()) {
    System.out.println(scanner.nextLine());
  }
} catch (FileNotFoundException fnfe) {
  fnfe.printStackTrace();
}
</code></pre>
</details>
<hr>
<details>
<summary>📚 try-with-resources with Multiple Resources</summary>
<ul>
<li>You can declare <strong>multiple resources</strong>, separated by semicolons <code>;</code>.</li>
</ul>
<pre><code class="language-java">
try (
  Scanner scanner = new Scanner(new File(&quot;testRead.txt&quot;));
  PrintWriter writer = new PrintWriter(new File(&quot;testWrite.txt&quot;))
) {
  while (scanner.hasNext()) {
    writer.print(scanner.nextLine());
  }
}
</code></pre>
</details>
<hr>
<details>
<summary>🧩 Custom Resource with AutoCloseable</summary>
<ul>
<li>Any class that implements <code>AutoCloseable</code> or <code>Closeable</code> can be used with try-with-resources.</li>
</ul>
<pre><code class="language-java">
public class MyResource implements AutoCloseable {
  @Override
  public void close() throws Exception {
    System.out.println(&quot;Closed MyResource&quot;);
  }
}
</code></pre>
</details>
<hr>
<details>
<summary>🧯 Multi-Catch (Java 7+)</summary>
<ul>
<li>You can catch <strong>multiple exceptions in a single block</strong> if they are <strong>unrelated by inheritance</strong>.</li>
<li>This avoids code duplication for similar exception-handling logic.</li>
</ul>
<pre><code class="language-java">
try {
  // Code that may throw multiple exceptions
} catch (IOException | SQLException e) {
  e.printStackTrace();
}
</code></pre>
<p>❗ You <strong>cannot</strong> do this if one exception is a subclass of another:</p>
<pre><code class="language-java">
// ❌ This will cause a compile-time error
catch (Exception | IOException e) { ... }
</code></pre>
<p><strong>Nested try blocks</strong> and <strong>Multiple exception handling</strong> in Java 👇</p>
<hr>
<h2 id="1-nested-try-catch">⚙️ <strong>1. Nested try-catch</strong></h2>
<p>✅ <strong>Allowed:</strong> You can put one <code>try</code> block inside another.</p>
<pre><code class="language-java">
try {
    try {
        int[] arr = new int[3];
        arr[5] = 10; // inner exception
    } catch (ArrayIndexOutOfBoundsException e) {
        System.out.println(&quot;Inner catch: &quot; + e);
    }

    int a = 10 / 0; // outer exception
} catch (ArithmeticException e) {
    System.out.println(&quot;Outer catch: &quot; + e);
}
</code></pre>
<p>🧠 <strong>Use only when:</strong></p>
<ul>
<li>Inner code needs its own handling logic inside a larger risky operation.</li>
</ul>
<p>  ⚠️ Avoid overusing — it reduces readability.</p>
<p>  Prefer <strong>separate try blocks</strong> or <strong>try-with-resources</strong> for cleaner code.</p>
<hr>
<h2 id="2-handling-multiple-exceptions">⚙️ <strong>2. Handling multiple exceptions</strong></h2>
<p>✅ <strong>Option 1 – Multi-catch (Java 7+):</strong></p>
<pre><code class="language-java">
try {
    int a = 10 / 0;
    int[] arr = new int[3];
    arr[5] = 42;
} catch (ArithmeticException | ArrayIndexOutOfBoundsException e) {
    System.out.println(&quot;Caught: &quot; + e);
}
</code></pre>
<p>➡️ Use when <strong>different exceptions need the same handling logic</strong>.</p>
<hr>
<p>✅ <strong>Option 2 – Multiple catch blocks:</strong></p>
<pre><code class="language-java">
try {
    int[] arr = new int[3];
    arr[5] = 42;
    int a = 10 / 0;
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println(&quot;Index error&quot;);
} catch (ArithmeticException e) {
    System.out.println(&quot;Math error&quot;);
} catch (Exception e) {
    System.out.println(&quot;Generic error&quot;);
}
</code></pre>
<p>➡️ Use when <strong>each exception needs different handling</strong>.</p>
<p>Always order: <strong>specific → general</strong>, else compiler error.</p>
<hr>
<h3 id="quick-summary-table">🧠 Quick Summary Table</h3>
<table>
<thead><tr>
<th>Concept</th>
<th>Allowed</th>
<th>Use When</th>
<th>Best Practice</th>
</tr></thead><tbody>
<tr>
<td><strong>Nested try</strong></td>
<td>✅</td>
<td>Inner risky block needs local handling</td>
<td>Avoid deep nesting</td>
</tr>
<tr>
<td><strong>Multi-catch</strong></td>
<td>✅ (Java 7+)</td>
<td>Same logic for multiple exceptions</td>
<td>Cleaner &amp; shorter</td>
</tr>
<tr>
<td><strong>Multiple catches</strong></td>
<td>✅</td>
<td>Different logic per exception</td>
<td>Order specific → general</td>
</tr>
</tbody></table>
<hr>
<p>✅ <strong>In short:</strong></p>
<blockquote>✔ Nested try is allowed but use sparingly.</blockquote>
<blockquote>✔ Multi-catch handles similar exceptions together.</blockquote>
<blockquote>✔ Separate catches for different handling logic.</blockquote>
</details>
<hr>
<details>
<summary>🤔 Can We Have a try Block Without a catch Block?</summary>
<p>✅ Yes, Java allows a <code>try</code> block without a <code>catch</code> block <strong>if a <code>finally</code> block is present</strong>.</p>
<pre><code class="language-java">
try {
  // risky code
} finally {
  // cleanup code
}
</code></pre>
<p>🚫 The <code>finally</code> block will always run <strong>unless <code>System.exit()</code> is called</strong> in the try block.</p>
</details>
<hr>
<h1 id="multithreading"><a href="https://codegym.cc/groups/multithreading-in-java">Multithreading</a></h1>
<h2 id="volatile-keyword">Volatile Keyword</h2>
<details>
<summary>🧮 Volatile Keyword</summary>
<ul>
<li><code>volatile</code> ensures visibility of changes to variables across threads.</li>
<li>It&#x27;s used for lightweight synchronization, often for flags.</li>
<li>Does <strong>not</strong> guarantee atomicity.</li>
</ul>
<hr>
<h3 id="scenario-stopping-a-background-thread"><strong>Scenario: Stopping a background thread</strong></h3>
<p>Imagine you have a worker thread running in the background, and you want to <strong>signal it to stop</strong> when the user clicks a “Stop” button.</p>
<p>Without <code>volatile</code>, the worker thread <strong>may not see</strong> the updated flag immediately, because of <strong>CPU caching or compiler optimizations</strong>.</p>
<hr>
<h3 id="example"><strong>Example</strong></h3>
<pre><code class="language-java">
public class Worker extends Thread {
    private volatile boolean running = true; // shared flag

    @Override
    public void run() {
        while (running) {
            System.out.println(&quot;Working...&quot;);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        System.out.println(&quot;Worker stopped.&quot;);
    }

    public void stopWorker() {
        running = false; // update visible to other threads immediately
    }
}
</code></pre>
<p><strong>Main program:</strong></p>
<pre><code class="language-java">
public static void main(String[] args) throws InterruptedException {
    Worker worker = new Worker();
    worker.start();

    Thread.sleep(5000); // let it run for 5 seconds
    worker.stopWorker(); // signal to stop
}
</code></pre>
<hr>
<h3 id="why-volatile-matters-here"><strong>Why <code>volatile</code> matters here</strong></h3>
<ul>
<li>Without <code>volatile</code>, the worker thread <strong>might never see <code>running = false</code></strong>, because it could keep reading a cached value of <code>running = true</code>.</li>
<li>With <code>volatile</code>, the write in <code>stopWorker()</code> is <strong>immediately visible</strong> to the worker thread’s <code>while (running)</code> loop.</li>
</ul>
<hr>
<h3 id="key-points"><strong>Key Points</strong></h3>
<ul>
<li>✅ <code>volatile</code> ensures <strong>visibility</strong> of changes between threads.</li>
<li>❌ It does <strong>not ensure atomicity</strong> — if you had <code>running++</code> instead of a simple boolean flag, you’d still need synchronization or <code>AtomicInteger</code>.</li>
</ul>
</details>
<hr>
<h2 id="deadlock">Deadlock</h2>
<p><img src="../images/JavaBasic/DeadLock.gif" alt="DeadLock"></p>
<details>
<summary>🔒 Deadlock</summary>
<ul>
<li>Occurs when two or more threads wait indefinitely for each other’s resources.</li>
<li>Thread A holds resource X and waits for resource Y, while Thread B holds Y and waits for X.</li>
</ul>
<h3 id="threads-resources">🔹 (threads &amp; resources)</h3>
<ul>
<li><strong>Thread A</strong> has <em>Resource X</em> and wants <em>Resource Y</em>.</li>
<li><strong>Thread B</strong> has <em>Resource Y</em> and wants <em>Resource X</em>.</li>
<li>Neither will release what they already hold → both are stuck → <strong>deadlock</strong>.</li>
</ul>
<hr>
<h3 id="key-characteristics-of-deadlock">🔹 Key characteristics of Deadlock</h3>
<ul>
<li><strong>Mutual exclusion</strong> → resources can’t be shared.</li>
<li><strong>Hold and wait</strong> → thread holds one resource while waiting for another.</li>
<li><strong>No preemption</strong> → resources can’t be forcibly taken away.</li>
<li><strong>Circular wait</strong> → A waits for B, B waits for A (or longer cycle).</li>
</ul>
<hr>
<h3 id="simple-java-example">🔹 Simple Java Example</h3>
<pre><code class="language-java">
class DeadlockDemo {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();

    public void methodA() {
        synchronized (lock1) {
            System.out.println(&quot;Thread A got lock1&quot;);
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            synchronized (lock2) {
                System.out.println(&quot;Thread A got lock2&quot;);
            }
        }
    }

    public void methodB() {
        synchronized (lock2) {
            System.out.println(&quot;Thread B got lock2&quot;);
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            synchronized (lock1) {
                System.out.println(&quot;Thread B got lock1&quot;);
            }
        }
    }
}
</code></pre>
<ul>
<li>If <strong>Thread A</strong> runs <code>methodA()</code> and <strong>Thread B</strong> runs <code>methodB()</code> → both can get stuck forever.</li>
</ul>
</details>
<hr>
<h2 id="race-condition">Race Condition</h2>
<details>
<summary>⚡ Race Condition</summary>
<ul>
<li>Happens when two or more threads access shared data and try to change it at the same time.</li>
<li>Example: one thread reads from a list while another deletes from it.</li>
</ul>
</details>
<hr>
<details>
<summary>🔁 [Fail-Fast vs Fail-Safe Iterators](https://www.geeksforgeeks.org/fail-fast-fail-safe-iterators-java/)</summary>
<h3 id="fail-safe">✅ Fail-Safe:</h3>
<ul>
<li>Uses <strong>copy of the collection</strong>.</li>
<li>No <code>ConcurrentModificationException</code>.</li>
<li>Ex: <code>ConcurrentHashMap</code>, <code>CopyOnWriteArrayList</code>.</li>
</ul>
<pre><code class="language-java">
Map&lt;String, String&gt; map = new ConcurrentHashMap&lt;&gt;();
map.put(&quot;key1&quot;, &quot;value1&quot;);
Iterator&lt;String&gt; it = map.keySet().iterator();
map.put(&quot;key2&quot;, &quot;value2&quot;); // No exception
</code></pre>
<h3 id="fail-fast">❌ Fail-Fast:</h3>
<ul>
<li>Throws <code>ConcurrentModificationException</code> on structural changes.</li>
<li>Ex: <code>ArrayList</code>, <code>HashMap</code>.</li>
</ul>
<pre><code class="language-java">
List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add(&quot;item1&quot;);
Iterator&lt;String&gt; it = list.iterator();
list.add(&quot;item2&quot;); // Throws exception
</code></pre>
</details>
<hr>
<h2 id="runnable-vs-callable">📞 Runnable vs Callable</h2>
<details>
<summary>📞 Runnable vs Callable</summary>
<table>
<thead><tr>
<th>Feature</th>
<th>Runnable</th>
<th>Callable</th>
</tr></thead><tbody>
<tr>
<td>Return Value</td>
<td>No</td>
<td>Yes (<code>V call()</code>)</td>
</tr>
<tr>
<td>Can throw Exception</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Submission</td>
<td>Thread, Executor</td>
<td>Executor only</td>
</tr>
</tbody></table>
<pre><code class="language-java">
Callable&lt;String&gt; task = () -&gt; &quot;Result&quot;;
Future&lt;String&gt; future = executor.submit(task);
String result = future.get(); // blocks until done
</code></pre>
<p><img src="../images/JavaBasic/CallableVsRunnable.png" alt="CallableVsRunnable.png"></p>
</details>
<hr>
<details>
<summary>🚦 Future - Asynchronous Computation</summary>
<ul>
<li><code>Future</code> allows retrieving results from async tasks.</li>
<li>Use <code>ExecutorService</code> to submit tasks and receive a <code>Future</code>.</li>
</ul>
<pre><code class="language-java">
ExecutorService executor = Executors.newFixedThreadPool(2);
Future&lt;String&gt; future = executor.submit(() -&gt; &quot;Hello&quot;);
System.out.println(future.get()); // Waits for result
</code></pre>
</details>
<hr>
<details>
<summary>🏗️ Guidelines: How to Handle Multithreading in Projects</summary>
<ul>
<li>Understand threads, synchronization, locks.</li>
<li>Use <code>java.util.concurrent</code> collections.</li>
<li>Use <code>synchronized</code>, <code>ReentrantLock</code>, or atomic classes.</li>
<li>Prefer <code>ExecutorService</code> for thread pooling.</li>
<li>Use <code>Callable</code>, <code>Future</code> for async results.</li>
<li>Use tools like <code>CountDownLatch</code>, <code>Semaphore</code>, <code>ThreadLocal</code>.</li>
<li>Avoid deadlocks by lock ordering.</li>
<li>Handle thread interruption properly.</li>
<li>Use modern features like <code>CompletableFuture</code>, <code>@Async</code>.</li>
<li>Document your concurrency design!</li>
</ul>
</details>
<hr>
<details>
<summary>🛡️ Synchronization Mechanisms</summary>
<p><strong>Synchronization applies only to:</strong></p>
<ul>
<li>Methods</li>
<li>Code blocks</li>
<li>(and by extension) class-level locks via static synchronized or custom lock objects.</li>
</ul>
<h3 id="method-level">🔸 Method-Level</h3>
<pre><code class="language-java">
public synchronized void method() { }
</code></pre>
<h3 id="block-level">🔸 Block-Level</h3>
<pre><code class="language-java">
synchronized(lockObj) {
    // critical section
}
</code></pre>
<h3 id="class-level">🔸 Class-Level</h3>
<pre><code class="language-java">
public static synchronized void staticMethod() { }
</code></pre>
<h3 id="waitnotifynotifyall">🔸 wait/notify/notifyAll</h3>
<pre><code class="language-java">
synchronized (sharedObject) {
    while (!condition) sharedObject.wait();
    sharedObject.notify();
}
</code></pre>
<h3 id="explicit-lock-reentrantlock">🔸 Explicit Lock (ReentrantLock)</h3>
<pre><code class="language-java">
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // critical code
} finally {
    lock.unlock();
}
</code></pre>
<h3 id="volatile">🔸 volatile</h3>
<pre><code class="language-java">
private volatile boolean running = true;
</code></pre>
</details>
<hr>
<details>
<summary>🚀 Asynchronous Techniques</summary>
<h3 id="1-threads">1. Threads</h3>
<pre><code class="language-java">
new Thread(() -&gt; { /* async task */ }).start();
</code></pre>
<h3 id="2-executorservice">2. ExecutorService</h3>
<pre><code class="language-java">
ExecutorService executor = Executors.newCachedThreadPool();
executor.submit(() -&gt; { /* async task */ });
executor.shutdown();
</code></pre>
<h3 id="3-completablefuture-java-8">3. CompletableFuture (Java 8+)</h3>
<pre><code class="language-java">
CompletableFuture.runAsync(() -&gt; { /* async task */ });
</code></pre>
<h3 id="4-completablefuture-with-callback">4. CompletableFuture with Callback</h3>
<pre><code class="language-java">
CompletableFuture.supplyAsync(() -&gt; &quot;result&quot;)
                 .thenAccept(result -&gt; System.out.println(result));
</code></pre>
<h3 id="5-spring-async">5. Spring @Async</h3>
<pre><code class="language-java">
@Async
public void asyncMethod() { /* async task */ }
</code></pre>
<h3 id="6-virtual-threads-java-21">6. Virtual Threads (Java 21)</h3>
<p>Virtual threads are lightweight threads introduced in Java 21 (as part of Project Loom) that allow writing concurrent code in a <strong>synchronous style</strong> without the overhead of traditional platform threads.</p>
<pre><code class="language-java">
public class VirtualThreadExample {
    public static void main(String[] args) throws Exception {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            List&lt;Callable&lt;String&gt;&gt; tasks = List.of(
                () -&gt; {
                    Thread.sleep(1000);
                    return &quot;Task 1 done on &quot; + Thread.currentThread();
                },
                () -&gt; {
                    Thread.sleep(500);
                    return &quot;Task 2 done on &quot; + Thread.currentThread();
                }
            );

            var results = executor.invokeAll(tasks);
            for (var result : results) {
                System.out.println(result.get());
            }
        }
    }
}
</code></pre>
<p>✅ <strong>Key Points</strong></p>
<ul>
<li>Each task runs on its own virtual thread.</li>
<li>Virtual threads are <strong>cheap to create</strong> (thousands or millions possible).</li>
<li>They simplify asynchronous programming by letting you write <strong>blocking code without blocking resources</strong>.</li>
<li>Best suited for high-concurrency applications (like servers).</li>
</ul>
</details>
<hr>
<details>
<summary>Synchronized & Asynchronous</summary>
<h2 id="two-separate-concepts">🧩 Two Separate Concepts</h2>
<table>
<thead><tr>
<th>Concept</th>
<th>Purpose</th>
</tr></thead><tbody>
<tr>
<td><strong><code>synchronized</code></strong></td>
<td>Prevents multiple threads from running the same code at once → ensures <em>thread safety</em></td>
</tr>
<tr>
<td><strong><code>asynchronous</code></strong></td>
<td>Allows multiple tasks to run <em>concurrently</em> (non-blocking execution)</td>
</tr>
</tbody></table>
<p>These two <strong>can be combined</strong>, but they are <strong>not opposites</strong> — they control <em>different</em> things:</p>
<ul>
<li><code>synchronized</code> → controls <em>who</em> can access the code.</li>
<li><code>asynchronous</code> → controls <em>when/how</em> the code runs (often in another thread).</li>
</ul>
<hr>
<h2 id="1-synchronous-method">⚙️ 1. Synchronous Method</h2>
<p>A <strong>normal</strong> (non-async) method runs sequentially, on the same thread.</p>
<pre><code class="language-java">
public void doTask() {
    System.out.println(&quot;Start&quot;);
    heavyWork(); // blocks until finished
    System.out.println(&quot;End&quot;);
}
</code></pre>
<p>🧭 Runs in a single thread, step-by-step.</p>
<hr>
<h2 id="2-synchronized-method">🧱 2. Synchronized Method</h2>
<p>A <strong>synchronized method</strong> adds a lock — only one thread can execute it on an object at a time.</p>
<pre><code class="language-java">
public synchronized void safeTask() {
    System.out.println(Thread.currentThread().getName() + &quot; entering...&quot;);
    // critical section
    try { Thread.sleep(1000); } catch (InterruptedException e) {}
    System.out.println(Thread.currentThread().getName() + &quot; leaving...&quot;);
}
</code></pre>
<p>If two threads call <code>safeTask()</code> on the same object, one must <strong>wait</strong> for the other to finish.</p>
<p>✅ Ensures safety,</p>
<p>❌ But makes code synchronous (blocking for other threads).</p>
<hr>
<h2 id="3-asynchronous-method">⚡ 3. Asynchronous Method</h2>
<p>You can make a method <strong>asynchronous</strong> by spawning new threads or using <code>CompletableFuture</code>.</p>
<pre><code class="language-java">
public CompletableFuture&lt;Void&gt; asyncTask() {
    return CompletableFuture.runAsync(() -&gt; {
        System.out.println(Thread.currentThread().getName() + &quot; running async work...&quot;);
        try { Thread.sleep(1000); } catch (InterruptedException e) {}
        System.out.println(Thread.currentThread().getName() + &quot; done!&quot;);
    });
}
</code></pre>
<p>✅ Runs concurrently</p>
<p>✅ Doesn’t block the main thread</p>
<p>❌ Must manage thread safety manually if sharing data</p>
<hr>
<h2 id="4-synchronized-block-inside-a-method">🔒 4. Synchronized Block (Inside a Method)</h2>
<p>If only <strong>part of</strong> the code must be thread-safe, use a synchronized block:</p>
<pre><code class="language-java">
private final Object lock = new Object();

public void partialSyncTask() {
    System.out.println(&quot;Before critical section&quot;);
    synchronized (lock) {
        // Only this part is locked
        System.out.println(&quot;Inside synchronized block&quot;);
    }
    System.out.println(&quot;After critical section&quot;);
}
</code></pre>
<p>✅ Gives fine-grained control</p>
<p>✅ Other threads can still run non-critical parts</p>
<hr>
<h2 id="5-asynchronous-block-inside-a-method">🚀 5. Asynchronous Block (Inside a Method)</h2>
<p>A block can also be <strong>run asynchronously</strong>, using threads or futures:</p>
<pre><code class="language-java">
public void asyncBlock() {
    System.out.println(&quot;Main thread running...&quot;);
    new Thread(() -&gt; {
        System.out.println(&quot;Running asynchronously inside block!&quot;);
    }).start();
}
</code></pre>
<p>✅ Only that block runs asynchronously</p>
<p>✅ The rest of the method continues immediately</p>
<hr>
<h2 id="6-combining-both-synchronized-asynchronous">🔗 6. Combining Both (Synchronized + Asynchronous)</h2>
<p>You can combine them — for example, running multiple async tasks that each use synchronized blocks to access shared data safely:</p>
<pre><code class="language-java">
class Counter {
    private int count = 0;
    private final Object lock = new Object();

    public void incrementAsync() {
        CompletableFuture.runAsync(() -&gt; {
            synchronized (lock) {
                count++;
                System.out.println(Thread.currentThread().getName() + &quot; -&gt; count = &quot; + count);
            }
        });
    }
}
</code></pre>
<p>✅ The work runs asynchronously (non-blocking)</p>
<p>✅ The critical update is synchronized (thread-safe)</p>
<hr>
<h4 id="summary-table">🧠 Summary Table</h4>
<table>
<thead><tr>
<th>Type</th>
<th>Execution</th>
<th>Thread Safety</th>
<th>Example Keyword</th>
</tr></thead><tbody>
<tr>
<td><strong>Synchronous Method</strong></td>
<td>Sequential</td>
<td>Depends on code</td>
<td>(none)</td>
</tr>
<tr>
<td><strong>Synchronized Method</strong></td>
<td>Sequential (locked)</td>
<td>✅ Safe</td>
<td><code>synchronized</code></td>
</tr>
<tr>
<td><strong>Asynchronous Method</strong></td>
<td>Concurrent (multi-threaded)</td>
<td>❌ Unsafe (unless guarded)</td>
<td><code>Thread</code>, <code>CompletableFuture</code></td>
</tr>
<tr>
<td><strong>Synchronized Block</strong></td>
<td>Partially locked</td>
<td>✅ Safe</td>
<td><code>synchronized(obj)</code></td>
</tr>
<tr>
<td><strong>Asynchronous Block</strong></td>
<td>Runs in background</td>
<td>❌ Unsafe (unless locked)</td>
<td><code>new Thread()</code>, <code>runAsync()</code></td>
</tr>
</tbody></table>
<hr>
<h3 id="example-combo">🧩 Example Combo</h3>
<pre><code class="language-java">
public void processDataAsync() {
    CompletableFuture.runAsync(() -&gt; {
        synchronized (this) {
            System.out.println(Thread.currentThread().getName() + &quot; safely updating shared data...&quot;);
        }
    });
}
</code></pre>
<p>✅ <strong>Asynchronous execution</strong> (non-blocking)</p>
<p>✅ <strong>Thread-safe update</strong> (locked section)</p>
</details>
<hr>
<details>
<summary>🔄 Synchronized Collections vs Non-Synchronized</summary>
<h3 id="synchronized">✅ Synchronized</h3>
<ul>
<li>Thread-safe</li>
<li>Slower due to locking</li>
<li>Examples: <code>Vector</code>, <code>Hashtable</code>, <code>Collections.synchronizedList()</code></li>
</ul>
<pre><code class="language-java">
List&lt;String&gt; syncList = Collections.synchronizedList(new ArrayList&lt;&gt;());
</code></pre>
<h3 id="non-synchronized">❌ Non-Synchronized</h3>
<ul>
<li>Not thread-safe</li>
<li>Fast in single-threaded environments</li>
<li>Examples: <code>ArrayList</code>, <code>HashMap</code>, <code>HashSet</code></li>
</ul>
<pre><code class="language-java">
List&lt;String&gt; list = new ArrayList&lt;&gt;();
</code></pre>
</details>
<hr>
<h1 id="multithreading-concepts-advanced">🧵 Multithreading Concepts: Advanced</h1>
<details>
<summary>🔁 Process vs Thread Synchronization</summary>
<h3 id="process-synchronization">🧩 <strong>Process Synchronization</strong></h3>
<ul>
<li>Controls access across <strong>multiple independent processes</strong>.</li>
<li>Used in <strong>multi-process systems</strong> to avoid data conflicts.</li>
</ul>
<h4 id="common-ipc-mechanisms">🔐 Common IPC Mechanisms:</h4>
<ul>
<li><strong>Semaphore</strong> – Allows limited access to shared resources.</li>
<li><strong>Mutex</strong> – Ensures only one process accesses a resource at a time.</li>
<li><strong>Condition Variables</strong> – Coordination based on specific conditions.</li>
<li><strong>Message Passing</strong> – Communicate via queues or sockets.</li>
<li><strong>Critical Section</strong> – Protected section of code using the above.</li>
</ul>
<hr>
<h3 id="thread-synchronization">🧵 <strong>Thread Synchronization</strong></h3>
<ul>
<li>Coordinates threads <strong>within the same process</strong>.</li>
<li>Java provides many built-in tools:</li>
</ul>
<h4 id="techniques">☑️ Techniques:</h4>
<ul>
<li><code>synchronized</code> methods/blocks</li>
<li><code>wait()</code>, <code>notify()</code>, <code>notifyAll()</code></li>
<li><code>volatile</code> keyword</li>
<li>Explicit locks (<code>ReentrantLock</code>)</li>
<li>Thread-safe collections: <code>ConcurrentHashMap</code>, <code>CopyOnWriteArrayList</code></li>
</ul>
<p>🔑 Thread sync ensures <strong>safe access to shared memory</strong> and avoids race conditions.</p>
</details>
<hr>
<details>
<summary>⚙️ Parallel Method Execution in Java</summary>
<h3 id="1-using-thread-class-basic">1️⃣ <strong>Using <code>Thread</code> Class (Basic)</strong></h3>
<pre><code class="language-java">
class Task1 extends Thread {
    public void run() {
        for (int i = 1; i &lt;= 5; i++) System.out.println(&quot;Task1 - Count: &quot; + i);
    }
}

class Task2 extends Thread {
    public void run() {
        for (int i = 1; i &lt;= 5; i++) System.out.println(&quot;Task2 - Count: &quot; + i);
    }
}

public class Main {
    public static void main(String[] args) {
        Task1 t1 = new Task1(); // create thread 1
        Task2 t2 = new Task2(); // create thread 2

        t1.start(); // ✅ run Task1 in parallel
        t2.start(); // ✅ run Task2 in parallel
    }
}

</code></pre>
<p>🟡 <strong><code>start()</code> runs them in parallel</strong>, but order is not guaranteed.</p>
<hr>
<h3 id="2-using-runnable-interface">2️⃣ <strong>Using <code>Runnable</code> Interface</strong></h3>
<pre><code class="language-java">
class Task implements Runnable {
    private String name;
    public Task(String name) { this.name = name; }

    public void run() {
        for (int i = 1; i &lt;= 5; i++) System.out.println(name + &quot; - Count: &quot; + i);
    }
}
</code></pre>
<p>✅ Better than extending <code>Thread</code> → separates logic from threading.</p>
<hr>
<h3 id="3-using-executorservice-thread-pool">3️⃣ <strong>Using <code>ExecutorService</code> (Thread Pool)</strong></h3>
<pre><code class="language-java">
ExecutorService executor = Executors.newFixedThreadPool(2);
executor.execute(() -&gt; { /* Task1 */ });
executor.execute(() -&gt; { /* Task2 */ });
executor.shutdown();
</code></pre>
<p>✅ Scalable, reusable, <strong>production-level</strong> approach.</p>
<hr>
<h3 id="4-using-completablefuture-java-8">4️⃣ <strong>Using <code>CompletableFuture</code> (Java 8+)</strong></h3>
<pre><code class="language-java">
CompletableFuture&lt;Void&gt; task1 = CompletableFuture.runAsync(() -&gt; { /* Task1 */ });
CompletableFuture&lt;Void&gt; task2 = CompletableFuture.runAsync(() -&gt; { /* Task2 */ });

CompletableFuture.allOf(task1, task2).join();
</code></pre>
<p>✅ Best for <strong>non-blocking</strong>, modern async tasks.</p>
<p><em>thread context and design trade-offs.</em></p>
<h2 id="1-what-is-threadlocal">🧩 <strong>1️⃣ What is <code>ThreadLocal</code>?</strong></h2>
<p><code>ThreadLocal</code> provides <strong>thread-scoped variables</strong> — each thread that accesses it gets its <strong>own independent copy</strong> of the variable.</p>
<p>So instead of sharing state across threads (which leads to synchronization problems),</p>
<p>you give each thread its own <strong>private storage</strong>.</p>
<hr>
<h3 id="example">🔹 Example</h3>
<pre><code class="language-java">
public class Example {
    private static final ThreadLocal&lt;Integer&gt; counter =
        ThreadLocal.withInitial(() -&gt; 0);

    public static void main(String[] args) {
        Runnable task = () -&gt; {
            for (int i = 0; i &lt; 3; i++) {
                counter.set(counter.get() + 1);
                System.out.println(Thread.currentThread().getName() + &quot; -&gt; &quot; + counter.get());
            }
        };
        new Thread(task, &quot;T1&quot;).start();
        new Thread(task, &quot;T2&quot;).start();
    }
}
</code></pre>
<p>🧠 Output (conceptually):</p>
<pre><code class="language-">
T1 -&gt; 1
T1 -&gt; 2
T1 -&gt; 3
T2 -&gt; 1
T2 -&gt; 2
T2 -&gt; 3
</code></pre>
<p>Even though both threads share the same static <code>ThreadLocal</code>,</p>
<p>each has its <em>own</em> copy of <code>counter</code>.</p>
<hr>
<h2 id="2-how-it-works-internally">⚙️ <strong>2️⃣ How It Works Internally</strong></h2>
<p>Each <code>Thread</code> object contains a reference to a <code>ThreadLocalMap</code>.</p>
<ul>
<li><code>ThreadLocal</code> acts as the <strong>key</strong>.</li>
<li>The <strong>value</strong> is stored in that thread’s map.</li>
</ul>
<p>So:</p>
<pre><code class="language-">
Thread A → ThreadLocalMap → {ThreadLocal@1=ValueA}
Thread B → ThreadLocalMap → {ThreadLocal@1=ValueB}
</code></pre>
<p>Thus, data is <em>logically global</em> (accessible anywhere in that thread) but <em>physically local</em> (isolated per thread).</p>
<hr>
<h2 id="3-real-world-use-cases">💼 <strong>3️⃣ Real-World Use Cases</strong></h2>
<p>Here’s where <code>ThreadLocal</code> shines — especially in multi-threaded frameworks or web apps.</p>
<hr>
<h3 id="use-case-1-request-context-in-web-applications">✅ <strong>Use Case 1: Request Context in Web Applications</strong></h3>
<p>In frameworks like Spring or custom web apps, each HTTP request is handled by a separate thread (from a thread pool).</p>
<p>You can use <code>ThreadLocal</code> to store per-request data like a correlation ID, user info, or tenant ID.</p>
<p><strong>Example:</strong></p>
<pre><code class="language-java">
public class RequestContext {
    private static final ThreadLocal&lt;String&gt; userId = new ThreadLocal&lt;&gt;();

    public static void setUserId(String id) { userId.set(id); }
    public static String getUserId() { return userId.get(); }
    public static void clear() { userId.remove(); }
}
</code></pre>
<p>Then anywhere in your app:</p>
<pre><code class="language-java">
String user = RequestContext.getUserId();
</code></pre>
<p>📘 Used by:</p>
<ul>
<li>Spring Security (for <code>SecurityContextHolder</code>)</li>
<li>MDC logging (Log4j, SLF4J’s <code>MDC.put()</code> uses <code>ThreadLocal</code>)</li>
</ul>
<hr>
<h3 id="use-case-2-database-connection-or-session-management">✅ <strong>Use Case 2: Database Connection or Session Management</strong></h3>
<p>In frameworks that manage JDBC connections manually (not Spring Boot),</p>
<p>you might use <code>ThreadLocal</code> to bind a database connection or transaction context to the current thread.</p>
<p><strong>Example:</strong></p>
<pre><code class="language-java">
public class ConnectionManager {
    private static final ThreadLocal&lt;Connection&gt; connectionHolder = new ThreadLocal&lt;&gt;();

    public static Connection getConnection() {
        Connection conn = connectionHolder.get();
        if (conn == null) {
            conn = DriverManager.getConnection(...);
            connectionHolder.set(conn);
        }
        return conn;
    }

    public static void clear() {
        connectionHolder.remove();
    }
}
</code></pre>
<blockquote>Ensures that all DAOs in the same thread use the <em>same</em> DB connection.</blockquote>
<hr>
<h3 id="use-case-3-logging-context-tracing">✅ <strong>Use Case 3: Logging Context / Tracing</strong></h3>
<p><code>ThreadLocal</code> is perfect for <strong>distributed tracing</strong> or <strong>log correlation IDs</strong>.</p>
<p>Example with SLF4J MDC:</p>
<pre><code class="language-java">
MDC.put(&quot;traceId&quot;, UUID.randomUUID().toString());
log.info(&quot;Processing request&quot;);
MDC.clear();
</code></pre>
<p>Each thread’s logs automatically include its unique trace ID.</p>
<hr>
<h3 id="use-case-4-thread-specific-formatter-parser">✅ <strong>Use Case 4: Thread-Specific Formatter / Parser</strong></h3>
<p>Creating formatters (like <code>SimpleDateFormat</code>) is not thread-safe.</p>
<p>Instead of synchronizing, use <code>ThreadLocal</code> to give each thread its own instance.</p>
<pre><code class="language-java">
private static final ThreadLocal&lt;SimpleDateFormat&gt; dateFormatter =
    ThreadLocal.withInitial(() -&gt; new SimpleDateFormat(&quot;yyyy-MM-dd&quot;));
</code></pre>
<p>This eliminates contention and avoids shared-state corruption.</p>
<hr>
<h2 id="4-pitfalls-best-practices">⚠️ <strong>4️⃣ Pitfalls &amp; Best Practices</strong></h2>
<table>
<thead><tr>
<th>Risk</th>
<th>Description</th>
<th>Solution</th>
</tr></thead><tbody>
<tr>
<td><strong>Memory leaks</strong></td>
<td>In thread pools, threads are reused; old <code>ThreadLocal</code> values may stick around if not cleared.</td>
<td>Always call <code>ThreadLocal.remove()</code> after use (e.g., in <code>finally</code>).</td>
</tr>
<tr>
<td><strong>Hidden coupling</strong></td>
<td>Code using <code>ThreadLocal</code> relies on implicit context → harder to reason about or test.</td>
<td>Keep <code>ThreadLocal</code> usage localized to infrastructure layers (logging, context).</td>
</tr>
<tr>
<td><strong>Inheritance confusion</strong></td>
<td><code>InheritableThreadLocal</code> shares value with child threads — can lead to unintended data sharing.</td>
<td>Use only if you explicitly need inherited context (e.g., async tracing).</td>
</tr>
</tbody></table>
<hr>
<h3 id="safe-usage-pattern">✅ Safe usage pattern</h3>
<pre><code class="language-java">
try {
    RequestContext.setUserId(&quot;abc&quot;);
    service.process();
} finally {
    RequestContext.clear(); // prevent leaks in thread pools
}
</code></pre>
<hr>
<h2 id="5-summary">🧠 <strong>5️⃣ Summary</strong></h2>
<table>
<thead><tr>
<th>Concept</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>What</strong></td>
<td>Thread-local variable = per-thread storage</td>
</tr>
<tr>
<td><strong>Why</strong></td>
<td>Avoid shared mutable state between threads</td>
</tr>
<tr>
<td><strong>How</strong></td>
<td>Each thread holds its own value in <code>ThreadLocalMap</code></td>
</tr>
<tr>
<td><strong>Use cases</strong></td>
<td>Request context, logging (MDC), DB connections, formatters</td>
</tr>
<tr>
<td><strong>Caution</strong></td>
<td>Clean up after use; avoid in business logic layers</td>
</tr>
</tbody></table>
<hr>
<h3 id="in-a-real-project">🚀 <strong>In a Real Project</strong></h3>
<ul>
<li>You’d use it <strong>in frameworks</strong>, not business code.</li>
</ul>
<p>  e.g., Spring’s <code>SecurityContextHolder</code>, SLF4J’s <code>MDC</code>, or a custom <code>TenantContext</code> for multi-tenancy.</p>
<ul>
<li>It allows passing contextual information <em>without modifying every method signature.</em></li>
</ul>
<hr>
<p><strong>independent Java programs</strong> for printing <strong>odd and even numbers alternately</strong>, starting with <strong>odd</strong> — one using <code>Thread</code>, the other using <code>ExecutorService</code>.</p>
<hr>
<h2 id="1-using-thread-waitnotify">🧵 1️⃣ Using <code>Thread</code> + <code>wait/notify</code></h2>
<pre><code class="language-java">
public class OddEvenThreadExample {
    private final int limit = 10;
    private int number = 1;
    private final Object lock = new Object();

    public void printOdd() {
        synchronized (lock) {
            while (number &lt;= limit) {
                if (number % 2 == 1) {
                    System.out.println(&quot;Odd : &quot; + number);
                    number++;
                    lock.notify();
                } else {
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            }
        }
    }

    public void printEven() {
        synchronized (lock) {
            while (number &lt;= limit) {
                if (number % 2 == 0) {
                    System.out.println(&quot;Even: &quot; + number);
                    number++;
                    lock.notify();
                } else {
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            }
        }
    }

    public static void main(String[] args) {
        OddEvenThreadExample printer = new OddEvenThreadExample();

        Thread oddThread = new Thread(printer::printOdd);
        Thread evenThread = new Thread(printer::printEven);

        oddThread.start();
        evenThread.start();
    }
}
</code></pre>
<p>🟡 Uses <code>synchronized</code>, <code>wait()</code> and <code>notify()</code> for thread coordination.</p>
<p>🟢 Output: Alternating odd and even numbers, starting with odd.</p>
<hr>
<h2 id="2-using-executorservice-lock-condition">⚙️ 2️⃣ Using <code>ExecutorService</code> + <code>Lock</code> + <code>Condition</code></h2>
<pre><code class="language-java">
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class OddEvenExecutorExample {
    private final int limit = 10;
    private int number = 1;

    private final Lock lock = new ReentrantLock();
    private final Condition oddTurn = lock.newCondition();
    private final Condition evenTurn = lock.newCondition();

    public void printOdd() {
        while (number &lt;= limit) {
            lock.lock();
            try {
                if (number % 2 == 0) {
                    oddTurn.await();
                } else {
                    System.out.println(&quot;Odd : &quot; + number);
                    number++;
                    evenTurn.signal();
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                lock.unlock();
            }
        }
    }

    public void printEven() {
        while (number &lt;= limit) {
            lock.lock();
            try {
                if (number % 2 == 1) {
                    evenTurn.await();
                } else {
                    System.out.println(&quot;Even: &quot; + number);
                    number++;
                    oddTurn.signal();
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                lock.unlock();
            }
        }
    }

    public static void main(String[] args) {
        OddEvenExecutorExample printer = new OddEvenExecutorExample();

        ExecutorService executor = Executors.newFixedThreadPool(2);
        executor.submit(printer::printOdd);
        executor.submit(printer::printEven);

        executor.shutdown();
    }
}
</code></pre>
<p>🟢 Uses <code>ReentrantLock</code>, <code>Condition</code>, and <code>ExecutorService</code>.</p>
<p>🔒 Offers <strong>better control</strong> in multithreaded systems.</p>
</details>
</details>
<hr>
<h1 id="design-patterns-in-java">🧩 Design Patterns in Java</h1>
<ul>
<li><a href="#-singleton-pattern">🔒 Singleton Pattern</a></li>
<li><a href="#-factory-pattern">🏭 Factory Pattern</a></li>
<li><a href="#-abstract-factory-pattern">🏭🏢 Abstract Factory Pattern</a></li>
<li><a href="#-builder-pattern">🏗️ Builder Pattern</a></li>
<li><a href="#-adapter-pattern">🔌 Adapter Pattern</a></li>
<li><a href="#-decorator-pattern">🎨 Decorator Pattern</a></li>
<li><a href="#-observer-pattern">👀 Observer Pattern</a></li>
<li><a href="#-strategy-pattern">🧠 Strategy Pattern</a></li>
<li><a href="#-command-pattern">🕹️ Command Pattern</a></li>
<li><a href="#-mvc-pattern">📐 MVC Pattern</a></li>
</ul>
<details>
<summary>🧩 <strong>Design Patterns in Java</strong></summary>
<h2 id="singleton-pattern">🔒 Singleton Pattern</h2>
<details>
<summary>🔒 <strong>1. Singleton Pattern</strong></summary>
<p>Ensures a class has only one instance and provides a global access point.</p>
<pre><code class="language-java">
public class Singleton {
  private static Singleton instance;
  private Singleton() {}
  public static Singleton getInstance() {
    if (instance == null) {
      instance = new Singleton();
    }
    return instance;
  }
}

public class Main {
    public static void main(String[] args) {
        // Access the Singleton instance
        Singleton singleObject = Singleton.getInstance();

        // Use its methods
        singleObject.showMessage();
    }
}

</code></pre>
<ul>
<li>You don’t use new Singleton() because the constructor is private.</li>
</ul>
<ul>
<li>You always call Singleton.getInstance() to get the single shared instance.</li>
</ul>
<ul>
<li>Every time you call getInstance(), it will return the same object.</li>
</ul>
<p>✅ Used for: Shared resources like DB connections, logging, configuration</p>
</details>
<hr>
<h2 id="factory-pattern">🏭 Factory Pattern</h2>
<details>
<summary>🏭 <strong>2. Factory Pattern</strong></summary>
<p>Creates objects without specifying the exact class.</p>
<pre><code class="language-java">
interface Product { void create(); }

class ConcreteProduct implements Product {
  public void create() { System.out.println(&quot;Concrete product.&quot;); }
}

class ProductFactory {
  public static Product createProduct() {
    return new ConcreteProduct();
  }
}
</code></pre>
<p>✅ Used for: Abstracting complex object creation</p>
</details>
<hr>
<h2 id="abstract-factory-pattern">🏭🏢 Abstract Factory Pattern</h2>
<details>
<summary>🏭🏢 <strong>3. Abstract Factory Pattern</strong></summary>
<p>Creates families of related objects without specifying concrete classes.</p>
<pre><code class="language-java">
interface AbstractFactory {
  Product createProduct();
  AnotherProduct createAnotherProduct();
}
</code></pre>
<p>✅ Used when: Different families of related objects are needed.</p>
</details>
<hr>
<h2 id="builder-pattern">🏗️ Builder Pattern</h2>
<details>
<summary>🏗️ <strong>4. Builder Pattern</strong></summary>
<p>Separates object construction from representation.</p>
<pre><code class="language-java">
class ProductBuilder {
  private Product product = new Product();

  public ProductBuilder withPart1(String part1) {
    product.setPart1(part1);
    return this;
  }

  public Product build() {
    return product;
  }
}
</code></pre>
<p>✅ Used when: Many optional fields/configs are involved.</p>
</details>
<hr>
<h2 id="adapter-pattern">🔌 Adapter Pattern</h2>
<details>
<summary>🔌 <strong>5. Adapter Pattern</strong></summary>
<p>Makes incompatible interfaces compatible.</p>
<pre><code class="language-java">
class Adapter implements Target {
  private Adaptee adaptee;
  public void request() {
    adaptee.specificRequest();
  }
}
</code></pre>
<p>✅ Used for: Legacy systems or 3rd-party libraries.</p>
</details>
<hr>
<h2 id="decorator-pattern">🎨 Decorator Pattern</h2>
<details>
<summary>🎨 <strong>6. Decorator Pattern</strong></summary>
<p>Dynamically adds responsibilities to objects.</p>
<pre><code class="language-java">
class Decorator implements Component {
  private Component component;
  public void operation() {
    component.operation();
  }
}
</code></pre>
<p>✅ Used for: Extending functionality without altering core logic.</p>
</details>
<hr>
<h2 id="observer-pattern">👀 Observer Pattern</h2>
<details>
<summary>👀 <strong>7. Observer Pattern</strong></summary>
<p>One-to-many dependency; observers update when subject changes. Used in kkafka with Saga Design patterns</p>
<pre><code class="language-java">
interface Observer { void update(String message); }

class Subject {
  List&lt;Observer&gt; observers = new ArrayList&lt;&gt;();
  void notifyObservers(String msg) {
    for (Observer o : observers) o.update(msg);
  }
}
</code></pre>
<p>✅ Used for: Event listeners, pub/sub systems.</p>
</details>
<hr>
<h2 id="strategy-pattern">🧠 Strategy Pattern</h2>
<details>
<summary>🧠 <strong>8. Strategy Pattern</strong></summary>
<p>Encapsulates algorithms and makes them interchangeable at runtime.</p>
<pre><code class="language-java">
interface Strategy { void execute(); }

class Context {
  private Strategy strategy;
  public void executeStrategy() { strategy.execute(); }
}
</code></pre>
<p>✅ Used for: Pluggable algorithms.</p>
</details>
<hr>
<h2 id="command-pattern">🕹️ Command Pattern</h2>
<details>
<summary>🕹️ <strong>9. Command Pattern</strong></summary>
<p>Encapsulates a request as an object.</p>
<pre><code class="language-java">
interface Command { void execute(); }

class Invoker {
  Command command;
  void executeCommand() { command.execute(); }
}
</code></pre>
<p>✅ Used for: Queued tasks, undo/redo.</p>
</details>
<hr>
<details>
<summary>📐 <strong>10. MVC Pattern (Model-View-Controller)</strong></summary>
<ul>
<li><strong>Model</strong>: Business logic/data</li>
<li><strong>View</strong>: UI</li>
<li><strong>Controller</strong>: Handles input and routes to model/view</li>
</ul>
<p>✅ Used for: Separating concerns in UI applications</p>
</details>
</details>
<hr>
<h2 id="basic">Basic</h2>
<details>
<summary>🌐 <strong>URL vs URI</strong></summary>
<h3 id="summary">Summary</h3>
<ul>
<li>All <strong>URLs are URIs</strong>, but not all <strong>URIs are URLs</strong>.</li>
<li>URI syntax:</li>
</ul>
<p>  <code>scheme:[//authority]path[?query][#fragment]</code></p>
<p><img src="../images/SpringBoot/UrlUri.png" alt="UrlUri.png"></p>
<p><img src="../images/JavaBasic/URLvsURNvsURI.jpg" alt="URLvsURNvsURI"></p>
<p><img src="../images/JavaBasic/StructureOfURL.jpg" alt="StructureOfURL"></p>
<h3 id="tabular-comparison">Tabular Comparison</h3>
<table>
<thead><tr>
<th>URL</th>
<th>URI</th>
</tr></thead><tbody>
<tr>
<td>Uniform Resource Locator: Contains info to fetch a resource</td>
<td>Uniform Resource Identifier: Identifies a resource</td>
</tr>
<tr>
<td><code>&lt;Protocol&gt;&lt;domain&gt;&lt;path&gt;</code></td>
<td><code>&lt;protocol&gt;://&lt;service-name&gt;/&lt;ResourceType&gt;/&lt;ResourceID&gt;</code></td>
</tr>
<tr>
<td><img src="../images/SpringBoot/URI-URN-Domain-Path.png" alt="img\_15.png"></td>
<td><img src="../images/SpringBoot/URI-URN.png" alt="img\_14.png"></td>
</tr>
</tbody></table>
</details>
<hr>
<details>
<summary>🧠 <strong>Authentication vs Authorization</strong></summary>
<ul>
<li><strong>Authentication</strong>: Verifies <em>who</em> the user is.</li>
<li><strong>Authorization</strong>: Determines <em>what</em> a user is allowed to access.</li>
<li>Both are often used together in secure systems.</li>
</ul>
</details>
<hr>
<details>
<summary>🗂️ <strong>Session Management Techniques</strong></summary>
<ul>
<li><a href="https://www.javainuse.com/spring/springboot_session">Session Handling in Spring Boot</a></li>
<li>Methods of session tracking:</li>
</ul>
<ul>
<li>Cookies</li>
<li>Hidden form fields</li>
<li>URL rewriting</li>
<li><code>HttpSession</code></li>
</ul>
</details>
<hr>
<details>
<summary>📋 <strong>Loggers Overview</strong></summary>
<p><img src="../images/SpringBoot/Loggers.png" alt="Loggers.png"></p>
<ul>
<li>Commonly used loggers: SLF4J, Log4j2, java.util.logging, Logback.</li>
<li>Helps in decoupling code from the logging implementation.</li>
</ul>
</details>
<hr>
<details>
<summary>📥 <strong>Varargs and @SafeVarargs</strong></summary>
<ul>
<li>Varargs allow a method to accept an arbitrary number of parameters.</li>
<li>Syntax: <code>method(Type... args)</code></li>
<li>Compiler gives <strong>unchecked warning</strong> with generics.</li>
</ul>
<h3 id="example-with-warning">Example with warning:</h3>
<pre><code class="language-java">
private void print(List... topics) {
  for (List&lt;String&gt; topic : topics) {
    System.out.println(topic);
  }
}
</code></pre>
<h3 id="suppressing-warnings">Suppressing warnings:</h3>
<pre><code class="language-java">
@SafeVarargs
private void print(List... topics) {
  for (List&lt;String&gt; topic : topics) {
    System.out.println(topic);
  }
}
</code></pre>
<h3 id="notes">Notes:</h3>
<ul>
<li><code>@SafeVarargs</code> only allowed on:</li>
</ul>
<ul>
<li>Final methods</li>
<li>Static methods</li>
<li>Constructors (Java 9+)</li>
<li>Not allowed on private methods before Java 9.</li>
</ul>
</details>
<hr>
<details>
<summary>📐 <strong>Java Math Functions</strong></summary>
<h3 id="1-trigonometric">1. Trigonometric:</h3>
<ul>
<li><code>Math.sin()</code>, <code>Math.cos()</code>, <code>Math.tan()</code></li>
<li><code>Math.atan()</code>, <code>Math.atan2()</code></li>
</ul>
<h3 id="2-exponential-logarithmic">2. Exponential / Logarithmic:</h3>
<ul>
<li><code>Math.exp()</code>, <code>Math.log()</code>, <code>Math.log10()</code></li>
</ul>
<h3 id="3-power-root">3. Power / Root:</h3>
<ul>
<li><code>Math.pow()</code>, <code>Math.sqrt()</code>, <code>Math.cbrt()</code></li>
</ul>
<h3 id="4-rounding">4. Rounding:</h3>
<ul>
<li><code>Math.ceil()</code>, <code>Math.floor()</code>, <code>Math.round()</code></li>
</ul>
<h3 id="5-misc">5. Misc:</h3>
<ul>
<li><code>Math.abs()</code>, <code>Math.max()</code>, <code>Math.min()</code></li>
</ul>
<hr>
<details>
<summary>🔻 <strong>Math.floor() Explained</strong></summary>
<p>Rounds <strong>down</strong> to the nearest integer (toward negative infinity).</p>
<pre><code class="language-java">
System.out.println(Math.floor(10.5));   // 10.0
System.out.println(Math.floor(-10.5));  // -11.0
</code></pre>
</details>
<details>
<summary>📊 <strong>Math.max() and Math.min()</strong></summary>
<h3 id="mathmax">Math.max():</h3>
<p>Returns the greater of two values.</p>
<pre><code class="language-java">
int max = Math.max(5, 10);  // 10
</code></pre>
<h3 id="mathmin">Math.min():</h3>
<p>Returns the smaller of two values.</p>
<pre><code class="language-java">
int min = Math.min(5, 10);  // 5
</code></pre>
<p>Supports: <code>int</code>, <code>long</code>, <code>float</code>, <code>double</code></p>
</details>
</details>
<hr>
<h2 id="26-what-is-the-difference-between-install-and-deploy">26. What is the difference between install and deploy</h2>
<ul>
<li>Running an installer executable to install a software application on a computer.</li>
<li>Deploying a web application to a web server or a cloud service.</li>
</ul>
<hr>
<p>Yet to do</p>
<https://www.geeksforgeeks.org/serialversionuid-in-java/>
<hr>
<https://wiki.sei.cmu.edu/confluence/display/java/OBJ58-J.+Limit+the+extensibility+of+classes+and+methods+with+invariants>
<hr>
<h1 id="question">⚙️ <strong>Question:</strong></h1>
<p>💯 Excellent question — this one touches on <em>modern Java design evolution</em> — from the <strong>classic Builder pattern</strong> to <strong>Java Records (introduced in Java 14, finalized in 16)</strong>.</p>
<p>Both deal with <em>data encapsulation and immutability</em>, but they serve <strong>different purposes and design goals</strong>.</p>
<hr>
<h2 id="1-the-basics">🧩 <strong>1️⃣ The Basics</strong></h2>
<table>
<thead><tr>
<th>Concept</th>
<th>Purpose</th>
<th>First Introduced</th>
</tr></thead><tbody>
<tr>
<td>🧱 <strong>Builder Pattern</strong></td>
<td>Build complex, possibly immutable objects fluently</td>
<td>Since early Java</td>
</tr>
<tr>
<td>📦 <strong>Record</strong></td>
<td>Concise syntax for <em>immutable data carriers</em> (POJOs)</td>
<td>Java 14 (preview), finalized in 16</td>
</tr>
</tbody></table>
<hr>
<p>⚙️ <strong>2️⃣ Builder Pattern — Classic Approach</strong></p>
<p>Builder is a <em>design pattern</em> — not a language feature.</p>
<p>You write it yourself (or use Lombok to generate it).</p>
<h3 id="example">🔹 Example</h3>
<pre><code class="language-java">
public class User {
    private final String name;
    private final int age;
    private final String email;

    private User(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.email = builder.email;
    }

    public static class Builder {
        private String name;
        private int age;
        private String email;

        public Builder name(String name) {
            this.name = name;
            return this;
        }
        public Builder age(int age) {
            this.age = age;
            return this;
        }
        public Builder email(String email) {
            this.email = email;
            return this;
        }
        public User build() {
            return new User(this);
        }
    }
}
</code></pre>
<p>Usage:</p>
<pre><code class="language-java">
User user = new User.Builder()
    .name(&quot;Alice&quot;)
    .age(30)
    .email(&quot;alice@example.com&quot;)
    .build();
</code></pre>
<p>✅ <strong>Pros</strong></p>
<ul>
<li>Flexible — can handle <strong>optional fields</strong>, <strong>validation</strong>, <strong>default values</strong>.</li>
<li>Works for <strong>mutable or immutable</strong> objects.</li>
<li>Clear, readable, and supports <strong>fluent chaining</strong>.</li>
</ul>
<p>❌ <strong>Cons</strong></p>
<ul>
<li>Verbose boilerplate code (especially for many fields).</li>
<li>Must manually maintain inner <code>Builder</code> class.</li>
<li>No compile-time immutability enforcement.</li>
</ul>
<hr>
<p>📦 <strong>3️⃣ Record — Modern Java Approach</strong></p>
<p>A <strong>record</strong> is a <em>special kind of class</em> for <strong>immutable data</strong>.</p>
<p>It automatically provides:</p>
<ul>
<li><code>private final</code> fields</li>
<li>A canonical constructor</li>
<li><code>equals()</code>, <code>hashCode()</code>, <code>toString()</code> implementations</li>
</ul>
<h3 id="example">🔹 Example</h3>
<pre><code class="language-java">
public record User(String name, int age, String email) {}
</code></pre>
<p>Usage:</p>
<pre><code class="language-java">
User user = new User(&quot;Alice&quot;, 30, &quot;alice@example.com&quot;);
System.out.println(user.name()); // getter
</code></pre>
<p>✅ <strong>Pros</strong></p>
<ul>
<li>Extremely concise (1 line = full immutable data class)</li>
<li>Automatically generates constructors, accessors, equals/hashCode/toString</li>
<li>Encourages <strong>immutability</strong> and <strong>value semantics</strong></li>
<li>Great for <strong>DTOs, API responses, data carriers</strong></li>
</ul>
<p>❌ <strong>Cons</strong></p>
<ul>
<li>No <em>optional</em> or <em>partial construction</em> support (all fields required)</li>
<li>No setter or builder-like flexibility</li>
<li>Cannot extend other classes (records are implicitly <code>final</code>)</li>
<li>Validation must be inside the canonical constructor or compact constructor</li>
</ul>
<hr>
<p>⚖️ <strong>4️⃣ Side-by-Side Comparison</strong></p>
<table>
<thead><tr>
<th>Feature</th>
<th>🧱 Builder Pattern</th>
<th>📦 Record</th>
</tr></thead><tbody>
<tr>
<td><strong>Immutability</strong></td>
<td>Optional (you decide)</td>
<td>Always immutable</td>
</tr>
<tr>
<td><strong>Boilerplate</strong></td>
<td>High (unless using Lombok)</td>
<td>Very low</td>
</tr>
<tr>
<td><strong>Flexibility</strong></td>
<td>High — can handle optional/complex construction</td>
<td>Low — all args must be provided</td>
</tr>
<tr>
<td><strong>Inheritance</strong></td>
<td>Can extend or be extended</td>
<td>Cannot extend, always <code>final</code></td>
</tr>
<tr>
<td><strong>Validation</strong></td>
<td>In <code>build()</code> or constructor</td>
<td>In compact constructor</td>
</tr>
<tr>
<td><strong>Optional fields</strong></td>
<td>Easy (skip setting)</td>
<td>Must be modeled explicitly (e.g. <code>Optional&lt;T&gt;</code>)</td>
</tr>
<tr>
<td><strong>Usage style</strong></td>
<td>Fluent (<code>.name().age().build()</code>)</td>
<td>Positional constructor or named factory</td>
</tr>
<tr>
<td><strong>Primary goal</strong></td>
<td>Simplify object creation with many optional params</td>
<td>Represent immutable data compactly</td>
</tr>
</tbody></table>
<hr>
<p>🧠 <strong>5️⃣ When to Use Which</strong></p>
<table>
<thead><tr>
<th>Scenario</th>
<th>Recommended</th>
</tr></thead><tbody>
<tr>
<td><strong>Complex domain model</strong> with optional fields, conditional validation</td>
<td>🧱 Builder</td>
</tr>
<tr>
<td><strong>Simple data transfer object (DTO)</strong> or <strong>API response</strong></td>
<td>📦 Record</td>
</tr>
<tr>
<td><strong>Immutability + readability + less boilerplate</strong></td>
<td>📦 Record</td>
</tr>
<tr>
<td><strong>Backwards-compatible POJO with customization logic</strong></td>
<td>🧱 Builder</td>
</tr>
<tr>
<td><strong>You’re using older Java (&lt;14)</strong></td>
<td>🧱 Builder</td>
</tr>
<tr>
<td><strong>Interfacing with frameworks like Spring/JPA</strong></td>
<td>Usually 🧱 Builder or regular POJO (records don’t work well with proxies yet)</td>
</tr>
</tbody></table>
<hr>
<p>🔍 <strong>6️⃣ You Can Combine Them</strong></p>
<p>In modern Java, you can actually <strong>use a builder to create a record</strong>, especially when there are many fields.</p>
<p>Example:</p>
<pre><code class="language-java">
public record User(String name, int age, String email) {
    public static class Builder {
        private String name;
        private int age;
        private String email;

        public Builder name(String name) { this.name = name; return this; }
        public Builder age(int age) { this.age = age; return this; }
        public Builder email(String email) { this.email = email; return this; }

        public User build() {
            return new User(name, age, email);
        }
    }
}
</code></pre>
<p>Usage:</p>
<pre><code class="language-java">
User user = new User.Builder()
    .name(&quot;Alice&quot;)
    .age(25)
    .build();
</code></pre>
<p>✅ You get:</p>
<ul>
<li>Record’s immutability + conciseness</li>
<li>Builder’s readability + optional field handling</li>
</ul>
<hr>
<p>⚡ <strong>7️⃣ Example Comparison</strong></p>
<h3 id="builder-style">Builder Style:</h3>
<pre><code class="language-java">
Order order = new Order.Builder()
    .id(&quot;123&quot;)
    .discount(10)
    .build();
</code></pre>
<h3 id="record-style">Record Style:</h3>
<pre><code class="language-java">
Order order = new Order(&quot;123&quot;, 10);
</code></pre>
<blockquote>If all data is required and simple → record.</blockquote>
<blockquote>If data is optional or object is complex → builder.</blockquote>
<hr>
<p>🧠 <strong>8️⃣ Quick Rule of Thumb</strong></p>
<table>
<thead><tr>
<th>Question</th>
<th>If Yes → Use</th>
</tr></thead><tbody>
<tr>
<td>Do I need optional or step-by-step object creation?</td>
<td><strong>Builder</strong></td>
</tr>
<tr>
<td>Is this a simple immutable data carrier?</td>
<td><strong>Record</strong></td>
</tr>
<tr>
<td>Do I need inheritance or custom lifecycle logic?</td>
<td><strong>Builder / POJO</strong></td>
</tr>
<tr>
<td>Am I writing DTOs, value objects, or responses?</td>
<td><strong>Record</strong></td>
</tr>
</tbody></table>
<hr>
<p>🧩 <strong>TL;DR</strong></p>
<table>
<thead><tr>
<th>Aspect</th>
<th>Builder</th>
<th>Record</th>
</tr></thead><tbody>
<tr>
<td>Pattern or Feature</td>
<td>Design pattern</td>
<td>Language feature</td>
</tr>
<tr>
<td>Mutability</td>
<td>Optional</td>
<td>Always immutable</td>
</tr>
<tr>
<td>Verbosity</td>
<td>High</td>
<td>Low</td>
</tr>
<tr>
<td>Optional Params</td>
<td>Easy</td>
<td>Hard</td>
</tr>
<tr>
<td>Use Case</td>
<td>Complex domain models</td>
<td>Simple immutable data</td>
</tr>
</tbody></table>
<hr>
<h3 id="1-what-happens-if-you-override-hashcode-but-not-equals"><strong>1️⃣ What happens if you override <code>hashCode()</code> but not <code>equals()</code>?</strong></h3>
<p><strong>Answer:</strong></p>
<p>If you override <code>hashCode()</code> but <em>don’t</em> override <code>equals()</code>, your objects may <strong>break the general contract</strong> between <code>equals()</code> and <code>hashCode()</code>.</p>
<h4 id="explanation">💡 Explanation</h4>
<p>The contract states:</p>
<ul>
<li>If two objects are <em>equal</em> (<code>a.equals(b)</code> → <code>true</code>), they <strong>must</strong> have the same <code>hashCode()</code>.</li>
<li>The reverse is not required, but consistency matters.</li>
</ul>
<p>If you override <code>hashCode()</code> and not <code>equals()</code>, equality defaults to <code>Object.equals()</code> (identity comparison).</p>
<p>→ So even if two objects have the same <code>hashCode()</code>, they’re considered <em>unequal</em> unless they’re the same instance.</p>
<h4 id="effect">⚠️ Effect</h4>
<p>Collections relying on hashing (<code>HashMap</code>, <code>HashSet</code>) will behave incorrectly:</p>
<ul>
<li>Two logically “equal” objects may end up in <strong>different buckets</strong>.</li>
<li>Duplicate logical entries may appear.</li>
</ul>
<h4 id="example">✅ Example:</h4>
<pre><code class="language-java">
class Person {
    String name;
    Person(String n) { this.name = n; }

    @Override
    public int hashCode() { return name.hashCode(); }
}

Person p1 = new Person(&quot;Alice&quot;);
Person p2 = new Person(&quot;Alice&quot;);

System.out.println(p1.equals(p2)); // false (identity)
System.out.println(p1.hashCode() == p2.hashCode()); // true

Set&lt;Person&gt; set = new HashSet&lt;&gt;();
set.add(p1);
set.add(p2);
System.out.println(set.size()); // 2 — violates logical equality
</code></pre>
<hr>
<h3 id="2-how-does-jvm-handle-method-overloading-and-overriding-internally"><strong>2️⃣ How does JVM handle method overloading and overriding internally?</strong></h3>
<h4 id="overloading-compile-time-polymorphism">🔹 <strong>Overloading</strong> (compile-time polymorphism)</h4>
<ul>
<li>Determined at <strong>compile time</strong> by <strong>method signature</strong> (name + parameter types).</li>
<li>The <strong>compiler</strong> picks the correct method based on the <em>static type</em> of the reference.</li>
<li>JVM executes the resolved method directly — <strong>no runtime dispatch</strong>.</li>
</ul>
<p>Example:</p>
<pre><code class="language-java">
void print(Object o) { System.out.println(&quot;Object&quot;); }
void print(String s) { System.out.println(&quot;String&quot;); }

Object obj = &quot;Hi&quot;;
print(obj); // prints &quot;Object&quot; — chosen at compile time
</code></pre>
<p>Here, the compile-time type of <code>obj</code> is <code>Object</code>, so <code>print(Object)</code> is bound.</p>
<hr>
<h4 id="overriding-runtime-polymorphism">🔹 <strong>Overriding</strong> (runtime polymorphism)</h4>
<ul>
<li>Determined at <strong>runtime</strong> based on the <strong>actual object type</strong>.</li>
<li>Implemented via <strong>virtual method tables (v-tables)</strong>.</li>
<li>Each class stores a table of method pointers.</li>
</ul>
<p>  When you call an overridden method, the JVM looks up the <strong>runtime class’s</strong> v-table and invokes the appropriate method.</p>
<p>Example:</p>
<pre><code class="language-java">
class Parent { void show() { System.out.println(&quot;Parent&quot;); } }
class Child extends Parent { void show() { System.out.println(&quot;Child&quot;); } }

Parent p = new Child();
p.show(); // &quot;Child&quot; — resolved via v-table at runtime
</code></pre>
<blockquote>What if we have the same method name (and parameters) as the parent class, but <strong>without</strong> using the <code>@Override</code> annotation?</blockquote>
<hr>
<h3 id="short-answer">✅ <strong>Short Answer:</strong></h3>
<p>If the child method <strong>matches the parent method’s signature exactly</strong>, it <strong>still overrides</strong> the parent’s method <strong>even without the <code>@Override</code> annotation</strong> — because overriding is determined by <strong>method signature and inheritance</strong>, not by the annotation.</p>
<p>The <code>@Override</code> annotation only helps the <strong>compiler catch mistakes</strong>; it’s not required for overriding to occur.</p>
<hr>
<h3 id="detailed-explanation">🔍 <strong>Detailed Explanation</strong></h3>
<h4 id="1-what-determines-overriding">1️⃣ What determines overriding?</h4>
<p>A method in a subclass overrides a parent method <strong>if and only if</strong>:</p>
<ul>
<li>The method has the <strong>same name</strong>.</li>
<li>The <strong>same parameter types</strong> (signature).</li>
<li>A <strong>compatible return type</strong> (covariant return allowed).</li>
<li>The <strong>same or less restrictive access modifier</strong>.</li>
<li>The <strong>method is not <code>static</code>, <code>private</code>, or <code>final</code></strong> in the parent class.</li>
</ul>
<p>Example:</p>
<pre><code class="language-java">
class Parent {
    void show() {
        System.out.println(&quot;Parent show&quot;);
    }
}

class Child extends Parent {
    // No @Override, but still overrides Parent.show()
    void show() {
        System.out.println(&quot;Child show&quot;);
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
        p.show();  // Output: Child show
    }
}
</code></pre>
<p>✅ Output confirms it’s overridden — runtime dispatch calls <code>Child.show()</code>.</p>
<hr>
<h4 id="2-what-does-override-actually-do">2️⃣ What does <code>@Override</code> actually do?</h4>
<p>It’s a <strong>compile-time annotation only</strong>.</p>
<p>The compiler uses it to <strong>verify</strong> that the method <em>does</em> correctly override a superclass (or interface) method.</p>
<p>If you make a mistake — for example, a typo in the method name, wrong parameter list, or incompatible signature — the compiler will catch it.</p>
<p>Example:</p>
<pre><code class="language-java">
class Parent {
    void display() {}
}

class Child extends Parent {
    @Override
    void Display() {} // ❌ compile-time error (method name mismatch)
}
</code></pre>
<p>Without <code>@Override</code>, this compiles but results in a <strong>new method (overloading)</strong> instead of overriding.</p>
<hr>
<h4 id="3-why-it-matters">3️⃣ Why it matters</h4>
<p>If you <strong>omit <code>@Override</code></strong>, and accidentally change:</p>
<ul>
<li>method name (typo),</li>
<li>parameter list,</li>
<li>or return type,</li>
</ul>
<p>...you’ll create a <strong>new method</strong>, not an override.</p>
<p>That can silently break polymorphism — your child class won’t behave as intended.</p>
<p>Example:</p>
<pre><code class="language-java">
class Parent {
    void print(String msg) {
        System.out.println(&quot;Parent: &quot; + msg);
    }
}

class Child extends Parent {
    // Forgot @Override, and accidentally changed parameter type
    void print(Object msg) {
        System.out.println(&quot;Child: &quot; + msg);
    }
}

Parent p = new Child();
p.print(&quot;Hello&quot;);  // &quot;Parent: Hello&quot; 😱
</code></pre>
<p>Even though the method names are the same, this is <strong>overloading</strong>, not overriding — because parameter types differ.</p>
<p>If you had used <code>@Override</code>, the compiler would’ve caught this mistake.</p>
<hr>
<h3 id="special-cases">⚠️ <strong>Special Cases</strong></h3>
<table>
<thead><tr>
<th>Case</th>
<th>Behavior</th>
</tr></thead><tbody>
<tr>
<td>Parent method is <code>static</code></td>
<td>Child method with same name <em>hides</em> it, not overrides it.</td>
</tr>
<tr>
<td>Parent method is <code>private</code></td>
<td>Child method is <em>new</em>, not visible to parent; no overriding.</td>
</tr>
<tr>
<td>Parent method is <code>final</code></td>
<td>Cannot be overridden — compile-time error.</td>
</tr>
<tr>
<td>Parent method return type changed covariantly</td>
<td>Allowed (if subtype of parent’s return).</td>
</tr>
</tbody></table>
<hr>
<h3 id="in-summary">🧠 <strong>In summary</strong></h3>
<table>
<thead><tr>
<th>With <code>@Override</code></th>
<th>Without <code>@Override</code></th>
</tr></thead><tbody>
<tr>
<td>Compiler checks correctness of override.</td>
<td>Compiler doesn’t check — might accidentally overload.</td>
</tr>
<tr>
<td>Optional but strongly recommended.</td>
<td>Works fine if method truly overrides, but risky.</td>
</tr>
<tr>
<td>No runtime impact — only compile-time validation.</td>
<td>Same runtime behavior if truly overriding.</td>
</tr>
</tbody></table>
<hr>
<h3 id="takeaway">✅ <strong>Takeaway</strong></h3>
<blockquote><code>@Override</code> is not required for overriding, but it’s a <strong>best practice</strong> — it protects you from subtle bugs caused by typos or signature mismatches.</blockquote>
<hr>
<h3 id="3-difference-between-final-effectively-final-and-const"><strong>3️⃣ Difference between <code>final</code>, effectively final, and <code>const</code></strong></h3>
<table>
<thead><tr>
<th>Concept</th>
<th>Meaning in Java</th>
<th>Example</th>
<th>Notes</th>
</tr></thead><tbody>
<tr>
<td><code>final</code></td>
<td>Variable’s reference cannot change after assignment.</td>
<td><code>final int x = 10;</code></td>
<td>For objects, the <em>reference</em> is final, not the contents.</td>
</tr>
<tr>
<td><strong>Effectively final</strong></td>
<td>Variable not declared <code>final</code>, but never reassigned after initialization.</td>
<td>Used in lambdas / inner classes.</td>
<td>Compiler treats it as <code>final</code>.</td>
</tr>
<tr>
<td><code>const</code> (other languages)</td>
<td>Compile-time constant (C/C++/C#).</td>
<td><code>const int x = 5;</code></td>
<td>Java reserved <code>const</code> but never implemented it — use <code>static final</code>.</td>
</tr>
</tbody></table>
<h4 id="example">Example:</h4>
<pre><code class="language-java">
int a = 10; // effectively final
Runnable r = () -&gt; System.out.println(a); // allowed

final int b = 20; // explicitly final
// both &#96;a&#96; and &#96;b&#96; behave the same in this context
</code></pre>
<hr>
<h3 id="4-pass-by-value-vs-reference-in-java"><strong>4️⃣ Pass-by-value vs. reference in Java</strong></h3>
<blockquote>✅ <strong>Java is always pass-by-value</strong>, but the value <em>can be a reference</em>.</blockquote>
<h4 id="explanation">💡 Explanation</h4>
<p>When you pass an object to a method, Java copies the <strong>reference value</strong> (the memory address).</p>
<p>That means:</p>
<ul>
<li>You can change the <em>object’s state</em> (since both references point to the same object).</li>
<li>You <strong>cannot</strong> change what the caller’s variable refers to.</li>
</ul>
<h4 id="example">Example:</h4>
<pre><code class="language-java">
void modify(StringBuilder sb) {
    sb.append(&quot; World&quot;);
    sb = new StringBuilder(&quot;Hi&quot;); // changes local reference only
}

StringBuilder s = new StringBuilder(&quot;Hello&quot;);
modify(s);
System.out.println(s); // &quot;Hello World&quot; — object modified
</code></pre>
<p>➡️ The object’s content changed, but the caller’s variable still points to the same object.</p>
<hr>
<h3 id="5-implement-an-immutable-list-without-using-collectionsunmodifiablelist"><strong>5️⃣ Implement an immutable list without using <code>Collections.unmodifiableList()</code></strong></h3>
<p>We can make our own immutable class by:</p>
<ul>
<li>Making the internal list <code>final</code>.</li>
<li>Wrapping it to prevent external mutation.</li>
<li>Exposing only read-only methods.</li>
</ul>
<h4 id="example">✅ Example:</h4>
<pre><code class="language-java">
import java.util.*;

final class ImmutableList&lt;E&gt; implements List&lt;E&gt; {
    private final List&lt;E&gt; list;

    private ImmutableList(List&lt;E&gt; list) {
        this.list = List.copyOf(list); // defensive copy (Java 10+)
    }

    public static &lt;E&gt; ImmutableList&lt;E&gt; of(List&lt;E&gt; source) {
        return new ImmutableList&lt;&gt;(source);
    }

    // Read-only methods delegate to internal list
    @Override public E get(int index) { return list.get(index); }
    @Override public int size() { return list.size(); }
    @Override public boolean contains(Object o) { return list.contains(o); }
    @Override public Iterator&lt;E&gt; iterator() { return Collections.unmodifiableList(list).iterator(); }

    // Mutating methods throw exceptions
    @Override public boolean add(E e) { throw new UnsupportedOperationException(); }
    @Override public E remove(int index) { throw new UnsupportedOperationException(); }
    @Override public void clear() { throw new UnsupportedOperationException(); }
    // ... override all mutators similarly
}
</code></pre>
<p>Usage:</p>
<pre><code class="language-java">
List&lt;String&gt; list = List.of(&quot;A&quot;, &quot;B&quot;);
ImmutableList&lt;String&gt; imm = ImmutableList.of(list);
imm.add(&quot;C&quot;); // throws UnsupportedOperationException
</code></pre>
<hr>
<p>✅ <strong>Summary Table</strong></p>
<table>
<thead><tr>
<th>Topic</th>
<th>Key Point</th>
</tr></thead><tbody>
<tr>
<td><code>hashCode()</code> without <code>equals()</code></td>
<td>Breaks hashing contract, leads to wrong behavior in sets/maps</td>
</tr>
<tr>
<td>Overloading vs Overriding</td>
<td>Compile-time vs runtime dispatch; v-table lookup for overriding</td>
</tr>
<tr>
<td><code>final</code> vs effectively final vs <code>const</code></td>
<td>Control mutability of references; no <code>const</code> in Java</td>
</tr>
<tr>
<td>Java parameter passing</td>
<td>Always pass-by-value (reference value for objects)</td>
</tr>
<tr>
<td>Immutable list</td>
<td>Custom wrapper with defensive copy + blocked mutation</td>
</tr>
</tbody></table>
<hr>
<h2 id="6-how-does-the-forkjoinpool-work-internally"><strong>6️⃣ How does the ForkJoinPool work internally?</strong></h2>
<h3 id="concept">💡 Concept</h3>
<p><code>ForkJoinPool</code> (introduced in Java 7) is a specialized thread pool designed for <strong>divide-and-conquer</strong> parallelism — especially <strong>recursive, fine-grained tasks</strong>.</p>
<p>Typical usage:</p>
<ul>
<li><code>ForkJoinPool</code> manages <strong>ForkJoinTasks</strong> (<code>RecursiveTask</code> or <code>RecursiveAction</code>).</li>
<li>Tasks can <strong>split (fork)</strong> into subtasks and later <strong>join</strong> their results.</li>
</ul>
<h3 id="internal-mechanics">⚙️ Internal Mechanics</h3>
<ul>
<li><strong>Work-stealing algorithm</strong></li>
</ul>
<ul>
<li>Each worker thread has its own <strong>deque (double-ended queue)</strong>.</li>
<li>When a thread finishes its own tasks, it “steals” tasks from the <strong>tail</strong> of another thread’s deque.</li>
<li>This minimizes contention and maximizes CPU utilization.</li>
</ul>
<ul>
<li><strong>Task submission</strong></li>
</ul>
<ul>
<li>Tasks are placed in a worker’s deque.</li>
<li>If submitted externally (<code>pool.submit()</code>), they go into a shared submission queue.</li>
</ul>
<ul>
<li><strong>Execution</strong></li>
</ul>
<ul>
<li>Each worker thread repeatedly:</li>
</ul>
<ul>
<li>Takes a task from the head of its deque.</li>
<li>Executes it; if the task forks new subtasks, they are pushed at the head of its own deque.</li>
</ul>
<ul>
<li><strong>Joining</strong></li>
</ul>
<ul>
<li>When a task calls <code>join()</code>, it either:</li>
</ul>
<ul>
<li>Gets the result immediately if already computed.</li>
<li>Or suspends until the result is ready.</li>
<li>The worker may “help” execute other tasks while waiting — improving throughput.</li>
</ul>
<ul>
<li><strong>Parallelism control</strong></li>
</ul>
<ul>
<li><code>ForkJoinPool</code> maintains a parallelism level (usually <code>Runtime.getRuntime().availableProcessors()</code>).</li>
<li>It dynamically manages worker threads for CPU saturation but avoids oversubscription.</li>
</ul>
<h3 id="example">✅ Example</h3>
<pre><code class="language-java">
class SumTask extends RecursiveTask&lt;Integer&gt; {
    private final int[] arr;
    private final int start, end;

    SumTask(int[] arr, int start, int end) {
        this.arr = arr; this.start = start; this.end = end;
    }

    @Override
    protected Integer compute() {
        if (end - start &lt;= 10)
            return Arrays.stream(arr, start, end).sum();

        int mid = (start + end) / 2;
        SumTask left = new SumTask(arr, start, mid);
        SumTask right = new SumTask(arr, mid, end);
        left.fork();
        return right.compute() + left.join();
    }
}
</code></pre>
<p><strong>Under the hood:</strong> The pool balances these subtasks across threads via work-stealing.</p>
<hr>
<h2 id="7-difference-between-synchronized-lock-and-stampedlock"><strong>7️⃣ Difference between <code>synchronized</code>, <code>Lock</code>, and <code>StampedLock</code></strong></h2>
<table>
<thead><tr>
<th>Feature</th>
<th><code>synchronized</code></th>
<th><code>Lock</code> (e.g. <code>ReentrantLock</code>)</th>
<th><code>StampedLock</code></th>
</tr></thead><tbody>
<tr>
<td>Type</td>
<td>JVM keyword</td>
<td>Java util class (<code>java.util.concurrent.locks</code>)</td>
<td>Newer lock (Java 8)</td>
</tr>
<tr>
<td>Granularity</td>
<td>Implicit monitor per object</td>
<td>Explicit lock objects</td>
<td>Stamp-based locking</td>
</tr>
<tr>
<td>Lock/Unlock</td>
<td>Automatic (enter/exit block)</td>
<td>Manual (<code>lock()/unlock()</code>)</td>
<td>Manual (<code>writeLock()/readLock()/unlock()</code>)</td>
</tr>
<tr>
<td>Fairness</td>
<td>No fairness guarantee</td>
<td>Can be fair/unfair</td>
<td>No fairness, focus on speed</td>
</tr>
<tr>
<td>Reentrancy</td>
<td>Yes</td>
<td>Yes (<code>ReentrantLock</code>)</td>
<td>No</td>
</tr>
<tr>
<td>Read/Write separation</td>
<td>No</td>
<td>Via <code>ReadWriteLock</code></td>
<td>Yes (<code>readLock</code>, <code>writeLock</code>, and <code>optimisticRead</code>)</td>
</tr>
<tr>
<td>Try/Timeout</td>
<td>No</td>
<td>Yes (<code>tryLock(long, TimeUnit)</code>)</td>
<td>Yes (<code>tryOptimisticRead</code>)</td>
</tr>
<tr>
<td>Performance</td>
<td>Simple but limited</td>
<td>More control</td>
<td>Fast for read-heavy workloads</td>
</tr>
<tr>
<td>Typical use</td>
<td>Basic synchronization</td>
<td>Fine-grained, flexible control</td>
<td>Optimized read-dominated concurrency</td>
</tr>
</tbody></table>
<h3 id="example">🧩 Example</h3>
<pre><code class="language-java">
// synchronized
synchronized void update() { /* critical section */ }

// Lock
lock.lock();
try { /* critical section */ }
finally { lock.unlock(); }

// StampedLock
long stamp = lock.writeLock();
try { /* write section */ }
finally { lock.unlockWrite(stamp); }
</code></pre>
<hr>
<h2 id="8-completablefuture-vs-traditional-future"><strong>8️⃣ CompletableFuture vs. traditional Future</strong></h2>
<table>
<thead><tr>
<th>Aspect</th>
<th><code>Future</code></th>
<th><code>CompletableFuture</code></th>
</tr></thead><tbody>
<tr>
<td>Introduced</td>
<td>Java 5</td>
<td>Java 8</td>
</tr>
<tr>
<td>Blocking get()</td>
<td>Yes</td>
<td>Optional — can compose non-blocking</td>
</tr>
<tr>
<td>Can complete manually</td>
<td>No</td>
<td>Yes (<code>complete(value)</code>)</td>
</tr>
<tr>
<td>Chaining</td>
<td>No</td>
<td>Yes (<code>thenApply</code>, <code>thenCompose</code>, etc.)</td>
</tr>
<tr>
<td>Exception handling</td>
<td>Manual</td>
<td>Built-in (<code>handle</code>, <code>exceptionally</code>)</td>
</tr>
<tr>
<td>Async composition</td>
<td>No</td>
<td>Yes — fluent pipeline</td>
</tr>
<tr>
<td>Dependent stages</td>
<td>No</td>
<td>Yes, multiple dependent tasks</td>
</tr>
</tbody></table>
<h3 id="example">✅ Example</h3>
<pre><code class="language-java">
// Traditional Future
Future&lt;Integer&gt; f = executor.submit(() -&gt; 5 + 5);
int result = f.get(); // blocks

// CompletableFuture
CompletableFuture.supplyAsync(() -&gt; 5 + 5)
    .thenApply(x -&gt; x * 2)
    .thenAccept(System.out::println);
</code></pre>
<ul>
<li><code>CompletableFuture</code> supports <strong>asynchronous chaining</strong>, <strong>combining</strong> multiple futures, and <strong>non-blocking</strong> continuations.</li>
<li>Internally, it uses the <strong>ForkJoinPool</strong> by default for async execution.</li>
</ul>
<hr>
<h2 id="9-design-a-concurrent-cache-with-read-write-locks"><strong>9️⃣ Design a concurrent cache with Read-Write Locks</strong></h2>
<h3 id="goal">💡 Goal</h3>
<p>Allow multiple concurrent readers but only one writer.</p>
<h3 id="example-implementation">✅ Example Implementation</h3>
<pre><code class="language-java">
import java.util.*;
import java.util.concurrent.locks.*;

class ConcurrentCache&lt;K, V&gt; {
    private final Map&lt;K, V&gt; map = new HashMap&lt;&gt;();
    private final ReadWriteLock lock = new ReentrantReadWriteLock();

    public V get(K key) {
        lock.readLock().lock();
        try {
            return map.get(key);
        } finally {
            lock.readLock().unlock();
        }
    }

    public void put(K key, V value) {
        lock.writeLock().lock();
        try {
            map.put(key, value);
        } finally {
            lock.writeLock().unlock();
        }
    }

    public int size() {
        lock.readLock().lock();
        try {
            return map.size();
        } finally {
            lock.readLock().unlock();
        }
    }
}
</code></pre>
<h3 id="optimization">🚀 Optimization</h3>
<ul>
<li>Replace <code>HashMap</code> with <code>ConcurrentHashMap</code> for finer granularity.</li>
<li>For read-heavy workloads: <code>StampedLock</code> with optimistic reads:</li>
</ul>
<pre><code class="language-java">
long stamp = lock.tryOptimisticRead();
V val = map.get(key);
if (!lock.validate(stamp)) {
    stamp = lock.readLock();
    try { val = map.get(key); } finally { lock.unlockRead(stamp); }
}
return val;
</code></pre>
<hr>
<h2 id="false-sharing-and-how-to-avoid-it"><strong>🔟 False Sharing and How to Avoid It</strong></h2>
<h3 id="concept">💡 Concept</h3>
<p><strong>False sharing</strong> occurs when multiple threads modify <em>different variables</em> that reside on the <strong>same CPU cache line</strong> (typically 64 bytes).</p>
<p>Even though threads access different data, cache coherency protocols (MESI) cause <strong>cache invalidations</strong>, leading to major performance degradation.</p>
<h3 id="example">🔍 Example</h3>
<pre><code class="language-java">
class Counter {
    volatile long a, b; // both may be on same cache line
}

Counter c = new Counter();
Thread t1 = new Thread(() -&gt; { for(int i=0;i&lt;1_000_000;i++) c.a++; });
Thread t2 = new Thread(() -&gt; { for(int i=0;i&lt;1_000_000;i++) c.b++; });
</code></pre>
<p>Both <code>a</code> and <code>b</code> are independent, but updates trigger invalidations on the same cache line.</p>
<h3 id="effect">🚫 Effect</h3>
<ul>
<li>CPU cache thrashing</li>
<li>Reduced throughput on multi-core systems</li>
</ul>
<h3 id="avoidance-techniques">✅ Avoidance Techniques</h3>
<ul>
<li><strong>Padding / Contention avoidance</strong></li>
</ul>
<pre><code class="language-java">
@Contended
class Counter {
   volatile long a;
   @Contended
   volatile long b;
}
</code></pre>
<ul>
<li>Use <code>@sun.misc.Contended</code> (requires JVM flag <code>-XX:-RestrictContended</code>).</li>
<li>Or manually add padding fields to align to cache lines.</li>
</ul>
<ul>
<li><strong>Separate objects</strong></li>
</ul>
<ul>
<li>Store heavily-updated fields in separate objects to avoid co-location.</li>
</ul>
<ul>
<li><strong>Use <code>LongAdder</code> / <code>LongAccumulator</code></strong></li>
</ul>
<ul>
<li>These classes are designed to <strong>reduce contention and false sharing</strong> by spreading updates across multiple variables internally.</li>
</ul>
<hr>
<h4 id="summary-table">✅ <strong>Summary Table</strong></h4>
<table>
<thead><tr>
<th>#</th>
<th>Topic</th>
<th>Key Takeaway</th>
</tr></thead><tbody>
<tr>
<td>6</td>
<td>ForkJoinPool</td>
<td>Work-stealing pool for fine-grained parallelism</td>
</tr>
<tr>
<td>7</td>
<td>synchronized vs Lock vs StampedLock</td>
<td>Increasing flexibility and performance</td>
</tr>
<tr>
<td>8</td>
<td>CompletableFuture</td>
<td>Asynchronous, composable, non-blocking futures</td>
</tr>
<tr>
<td>9</td>
<td>Concurrent cache</td>
<td>Use ReadWriteLock or StampedLock for safe access</td>
</tr>
<tr>
<td>10</td>
<td>False sharing</td>
<td>Cache-line contention — solved by padding or LongAdder</td>
</tr>
</tbody></table>
<hr>
<hr>
<h1 id="junit">Junit</h1>
<blockquote>&lt;https://www.java2novice.com/junit-examples/junit-annotations/&gt;</blockquote>
<h2 id="junit-mockito">Junit mockito</h2>
<blockquote>&lt;https://programmingtechie.com/2020/10/16/spring-boot-testing-tutorial-unit-testing-with-junit-5-and-mockito/&gt;</blockquote>
<hr>
<ul>
<li><strong>Conciseness:</strong></li>
</ul>
<ul>
<li>Lambda expressions allow you to express instances of single-method interfaces (functional interfaces) more concisely compared to using anonymous classes. This leads to cleaner and more readable code.</li>
</ul>
<p>  <strong>Example:</strong></p>
<pre><code class="language-java">
// Without lambda expression
Runnable runnable = new Runnable() {
    public void run() {
        System.out.println(&quot;Hello, World!&quot;);
    }
};

// With lambda expression
Runnable runnableLambda = () -&gt; System.out.println(&quot;Hello, World!&quot;);
</code></pre>
<ul>
<li><strong>Functional Interfaces:</strong></li>
</ul>
<ul>
<li>Lambda expressions are primarily used with functional interfaces, which are interfaces with a single abstract method. They allow you to treat functionality as a method argument, enabling a more functional programming style.</li>
</ul>
<p>  <strong>Example:</strong></p>
<pre><code class="language-java">
// Functional interface
interface MyFunctionalInterface {
    void myMethod();
}

// Using lambda expression with functional interface
MyFunctionalInterface myFunction = () -&gt; System.out.println(&quot;My Method&quot;);
</code></pre>
<ul>
<li><strong>Readability:</strong></li>
</ul>
<ul>
<li>Lambda expressions improve the readability of code, especially when dealing with functional programming constructs like streams and predicates. They allow you to express the logic more directly.</li>
</ul>
<p>  <strong>Example:</strong></p>
<pre><code class="language-java">
// Without lambda expression
List&lt;Integer&gt; numbers = Arrays.asList(1, 2, 3, 4, 5);
numbers.forEach(new Consumer&lt;Integer&gt;() {
    public void accept(Integer n) {
        System.out.println(n);
    }
});

// With lambda expression
numbers.forEach(n -&gt; System.out.println(n));
</code></pre>
<ul>
<li><strong>Functional Programming:</strong></li>
</ul>
<ul>
<li>Lambda expressions facilitate functional programming concepts, such as passing behavior as an argument, which makes it easier to write more modular and reusable code.</li>
</ul>
<p>  <strong>Example:</strong></p>
<pre><code class="language-java">
List&lt;String&gt; names = Arrays.asList(&quot;Alice&quot;, &quot;Bob&quot;, &quot;Charlie&quot;);

// Without lambda expression
Collections.sort(names, new Comparator&lt;String&gt;() {
    public int compare(String s1, String s2) {
        return s1.compareTo(s2);
    }
});

// With lambda expression
Collections.sort(names, (s1, s2) -&gt; s1.compareTo(s2));
</code></pre>
<ul>
<li><strong>Parallelism:</strong></li>
</ul>
<ul>
<li>Lambda expressions play a crucial role in enabling parallelism and concurrency through the use of the Streams API. They make it easier to write parallelizable code by expressing operations that can be executed concurrently.</li>
</ul>
<p>  <strong>Example:</strong></p>
<pre><code class="language-java">
List&lt;Integer&gt; numbers = Arrays.asList(1, 2, 3, 4, 5);

// Without lambda expression
int sum = 0;
for (int number : numbers) {
    sum += number;
}

// With lambda expression and parallel stream
int sumParallel = numbers.parallelStream().reduce(0, (x, y) -&gt; x + y);
</code></pre>
<p>Lambda expressions, along with functional interfaces, contribute to making Java code more expressive, readable, and suitable for functional programming paradigms. </p>
<p>They are particularly valuable in scenarios where concise, single-purpose behavior is required, such as in the case of functional interfaces or functional programming constructs like streams and parallel processing. </p>
<hr>
<table>
<thead><tr>
<th>Communication</th>
<th>Check</th>
</tr></thead><tbody>
<tr>
<td>Coding Skill</td>
<td>Should be ready for write pseudo code</td>
</tr>
<tr>
<td>Java Concept</td>
<td>Java Concept, Spring, collections, Threads , Java 8</td>
</tr>
<tr>
<td>Database knowledge</td>
<td>Schema, data model…etc</td>
</tr>
<tr>
<td>Unix</td>
<td>Basic commands , cp, grep, mv, cd, pwd, ls, ftp, ssh, find. Ps,</td>
</tr>
<tr>
<td>SQL/PLSQL</td>
<td>Joining of the two table ( one to many, may to One mapping scenario), inter join, Outerjoin etc</td>
</tr>
<tr>
<td>CI/CD</td>
<td>Deployments..</td>
</tr>
</tbody></table>
<hr>
<h2 id="java-questions">Java Questions</h2>
<ul>
<li>Sort employee Array using java 7 and 8</li>
<li>Difference/similarities between Arraylist vs Linkedlist</li>
<li>Explain ConcurrentModification Exception</li>
<li>Explain abstract and interface</li>
<li>What is functional interface</li>
<li>Why we use lambda expression</li>
</ul>
<p>   Lambda expressions in Java provide a concise and expressive way to represent anonymous functions. They were introduced in Java 8 as part of the Java SE 8 release, along with the functional programming features. Here are some reasons why lambda expressions are used in Java:</p>
<ul>
<li>How will you maintain code standards</li>
<li>Deployment in GCP</li>
<li>How to check application health</li>
<li>Explain Polymorphism and encapsulation</li>
<li>Major Issues in the project.</li>
<li>Singleton design pattern</li>
<li>How to deploy in jenkins</li>
<li>Thumb rule of Junit testing 16. Why String is immutable?</li>
<li>What is try catch finally</li>
<li>Stream api </li>
<li>Parallel stream </li>
<li>Inbuilt methods in stream. </li>
<li>Find duplicates using the stream. </li>
<li>Sort the numbers using comparator/comparable. </li>
<li>Collections in java </li>
<li>Predicate in java 8 </li>
<li>Optional in java 8 </li>
<li>Uses of map in stream function </li>
<li>Multithreading </li>
<li>Synchronisation in java </li>
<li>Difference between runtime and checked exceptions. </li>
<li>Explain the try with resources </li>
<li>Serialization </li>
<li>Explain Some of the features in Java 8 </li>
<li>Java streams API methods and its uses with example. </li>
<li>In filter streams, what is the return type? </li>
<li>What is method reference. </li>
<li>How many class you can create inside try with resources? </li>
<li>Given an employee array and asked to list it in code by filtering it&#x27;s name and age using streams. </li>
<li>an employee array and asked to list employees with particular employee name and age and asked to return true using stream. </li>
<li>how will you group the employeeList by age alone. </li>
<li>how do you list sum of ages in an employeeList? </li>
<li>Given an employee array and asked to list it in code by filtering it&#x27;s name. </li>
<li>types of string declaration and how it stores internally </li>
<li>How to create a immutable class? </li>
<li>Brief run() method. </li>
<li>Difference between Fail fast and fail safe. </li>
<li>Explain Hashmap and hash set. </li>
<li>Integer[20,10,25,9,7] find max 3 numbers using streamAPI. </li>
<li>What is purpose of default method in interface </li>
<li>How will you simplify the boiler plate code for the above program? return a+b should not be used again and again but it should be compatible for all the three return types?</li>
</ul>
<pre><code class="language-java">
    public class Calculator {
        public int add(int a, int b) {
        return a + b;
        }

        public float add(float a, float b) {
            return a + b;
        }

        public double add(double a, double b) {
            return a + b;
        }

    }
</code></pre>
<ul>
<li>Static Keyword in method, class and variable with example. </li>
<li>Throw and Throws explain with example. </li>
<li>Default vs Static Methods in functionalInterface in Java8</li>
<li>How to compile simple applications</li>
<li>What are required to run simple Java applications</li>
<li>What is the difference between JDK and JRE</li>
<li>Is it possible run the application with JRE</li>
<li>What is JVM</li>
<li>What are collection, how collections are used</li>
<li>Hashmap, what is the complexity of traversing</li>
<li>What build tool used</li>
</ul>`;

if (document.getElementById('content')) {
    document.getElementById('content').innerHTML = javabasicContentData;
}
