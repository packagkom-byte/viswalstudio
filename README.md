# ViswalStudio

A .NET library project template optimized for Visual Studio development.

## Project Structure

This solution contains:
- **ViswalStudio** - A class library project with example Calculator implementation
- **ViswalStudio.Tests** - xUnit test project with comprehensive test coverage

## Prerequisites

- .NET 10.0 SDK or later
- Visual Studio 2022 (or Visual Studio Code with C# extension)

## Getting Started

### Building the Solution

```bash
dotnet build
```

### Running Tests

```bash
dotnet test
```

### Opening in Visual Studio

1. Open `ViswalStudio.sln` in Visual Studio
2. Build the solution (Ctrl+Shift+B)
3. Run tests from Test Explorer (View > Test Explorer)

## Project Features

- ✅ Clean solution structure with separate src and tests directories
- ✅ xUnit testing framework with example tests
- ✅ Comprehensive .gitignore for .NET projects
- ✅ XML documentation comments
- ✅ Theory-based parameterized tests
- ✅ Visual Studio compatible solution file

## Development

The project includes a simple `Calculator` class with basic arithmetic operations to demonstrate:
- Proper class structure
- XML documentation
- Unit testing with xUnit
- Exception handling
- Theory-based parameterized testing

## Testing

Tests are written using xUnit and follow the Arrange-Act-Assert pattern. The test project includes:
- Basic unit tests
- Exception testing
- Parameterized tests using `[Theory]` and `[InlineData]`

Run all tests:
```bash
dotnet test
```

Run tests with detailed output:
```bash
dotnet test --logger "console;verbosity=detailed"
```

## License

This project is open source and available under the MIT License.