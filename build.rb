# output = "declare global {\n"

# files = Dir.glob(File.join('src/functions/*.ts')).delete_if do |path|
#   path =~ /index\.ts/
# end

# def function_name(path)
#   name = File.basename(path).split('.').first
# end

# files.each do |function|
#   output += %(  import _#{function_name(function)} from "#{function.split('.').first}"\n)
# end

# output += "\n"

# files.each do |function|
#   name = function_name(function)
#   output += %(  var #{name}: typeof _#{name}\n)
# end

# output += "}\n"

# File.open('functions.d.ts', 'a') do |file|
#   file.write(output)
# end

lines = File.read("functions.d.ts").split("\n")

file = File.open("functions.d.ts", "w+")

lines.each do |line|
  first_char = line[0]
  next if %w[d }].include?(first_char)
  next if line.include?('import')
  next if line.include?('export {}')
  next if line.include?('export default') && !line.include?('function')
  file.write(
    line.gsub('export default', 'declare')
        .gsub('export interface', 'interface')
        .gsub('export', '') + "\n"
  )
end

file.write <<-TS
declare var ON: EventBinder
declare var OFF: EventBinder
TS

file.close
