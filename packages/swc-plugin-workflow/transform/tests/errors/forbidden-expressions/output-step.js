import { registerStepFunction } from "workflow/internal/private";
import { registerSerializationClass } from "workflow/internal/class-serialization";
/**__internal_workflows{"steps":{"input.js":{"TestClass#stepMethod":{"stepId":"step//./input//TestClass#stepMethod"},"stepWithArguments":{"stepId":"step//./input//stepWithArguments"},"stepWithThis":{"stepId":"step//./input//stepWithThis"}}},"classes":{"input.js":{"TestClass":{"classId":"class//./input//TestClass"}}}}*/;
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
