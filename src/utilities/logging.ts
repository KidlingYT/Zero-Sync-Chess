// Logging Utility encapsulates logging volatity.

import { makeTimestampedUUID } from "@/utilities/lib/utils";

export class Logging {
    private activeTraces: Trace[] = [];

    constructor() {}

    startTrace() {
        const trace = new Trace();
        this.activeTraces.push(trace);
        return trace;
    }
    getActiveTrace(id: string) {
        return this.activeTraces.find((trace) => trace.getId() === id);
    }
    endTrace(id: string, message?: string) {
        const trace = this.getActiveTrace(id);
        if (!trace) {
            this.logEvent({
                message: `Unable to find trace, id: ${id}`,
                level: "Warning",
            });
            return;
        }
        trace.end(message);
    }
    logEvent(event: { message: string; level: LogEvent["level"] }) {
        const logEvent = { ...event, id: makeTimestampedUUID() };
        this.saveLog(logEvent);
    }

    saveLog(event: LogEvent) {
        // TODO: implement saveLog
        console.log(
            `Event: ${event.id} - Level: ${event.level} - ${event.message}`
        );
    }
}

export interface LogEvent {
    id: string;
    level: "Critical" | "Error" | "Security" | "Warning" | "Normal";
    message: string;
    parentLog?: string;
}

export interface Span {
    timeStampEpoch: number;
    message?: string;
}

export interface TraceEvent {
    startTime: number;
    endTime: number;
    spans: Span[];
}
class Trace {
    private id: string = "";
    private startTimeEpoch: number = new Date().getTime();
    private endTimeEpoch: number = new Date().getTime();
    private spans: Span[] = [];

    constructor() {
        this.id = makeTimestampedUUID();
        this.startTimeEpoch = new Date().getTime();
    }

    getId() {
        return this.id;
    }

    addSpan(span: Span) {
        this.spans.push(span);
    }

    end(message?: string) {
        this.addSpan({
            message: message ?? "End Trace",
            timeStampEpoch: new Date().getTime(),
        });
        this.endTimeEpoch = new Date().getTime();
        // TODO: actually save somewhere
    }

    getTrace(): TraceEvent {
        return {
            startTime: this.startTimeEpoch,
            endTime: this.endTimeEpoch,
            spans: this.spans,
        };
    }
}
