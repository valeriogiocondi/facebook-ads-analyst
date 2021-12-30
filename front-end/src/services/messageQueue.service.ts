// UTILS
import PubSub from 'pubsub-js'


class MessageQueue  { 

    subscribe(topic: string, cb: any): void {
        
        PubSub.subscribe(topic, cb);
    }

    publish(topic: string, cb?: any): void {
        
        PubSub.publish(topic, cb);
    }

    unsubscribe(topic: string): void {
        
        PubSub.unsubscribe(topic);
    }
}

// SINGLETON
// Export an instance of the class directly
export default new MessageQueue();
