#import "XMLParser.h"
#import "XMLDictionary.h"

@implementation XMLParser

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(parseXMLtoObject:(NSString *)xmlString withCallback:(RCTResponseSenderBlock)callback)
{
  // Your implementation here
    NSDictionary *dic = [NSDictionary dictionaryWithXMLString:xmlString];
    callback(@[dic]);
}

@end
