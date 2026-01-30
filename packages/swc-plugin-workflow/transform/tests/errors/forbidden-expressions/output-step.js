import { registerStepFunction } from "workflow/internal/private";
import { registerSerializationClass } from "workflow/internal/class-serialization";
/**__internal_workflows{"steps":{"step//./input//TestClass#stepMethod":{"name":"TestClass#stepMethod","source":"input.js"},"step//./input//stepWithArguments":{"name":"stepWithArguments","source":"input.js"},"step//./input//stepWithThis":{"name":"stepWithThis","source":"input.js"}},"classes":{"class//./input//TestClass":{"name":"TestClass","source":"input.js"}}}*/;
export async function stepWithThis() {
    // Error: this is not allowed
    return this.value;
}
export async function stepWithArguments() {
    // Error: arguments is not allowed
    return arguments[0];
}
class TestClass extends BaseClass {
    async stepMethod() {
        // Error: super is not allowed
        return super.method();
    }
}
registerStepFunction("step//./input//stepWithThis", stepWithThis);
registerStepFunction("step//./input//stepWithArguments", stepWithArguments);
registerStepFunction("step//./input//TestClass#stepMethod", TestClass.prototype.stepMethod);
registerSerializationClass("class//./input//TestClass", TestClass);
